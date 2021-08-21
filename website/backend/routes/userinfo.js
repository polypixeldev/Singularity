module.exports = (discord, client, req, res) => {
  discord
    .get("https://discord.com/api/users/@me")
    .then((apiRes) => {
      discord
        .get(
          `https://cdn.discordapp.com/avatars/${apiRes.data.id}/${apiRes.data.avatar}`,
          {
            responseType: "arraybuffer",
          }
        )
        .then((avatarRes) => {
          apiRes.data.avatar = Buffer.from(avatarRes.data, "binary").toString(
            "base64"
          );

          discord
            .get(`https://discord.com/api/users/@me/guilds`)
            .then(async (guildsRes) => {
              for (let i = 0; i < guildsRes.data.length; i++) {
                let ev = { available: false, manageable: false };

                client.emit(
                  "guildAvailable",
                  ev,
                  guildsRes.data[i].id,
                  apiRes.data.id
                );
                console.log(`${guildsRes.data[i].name}: ${ev.manageable}`);

                guildsRes.data[i].available = ev.available;
                if (ev.manageable) {
                  guildsRes.data[i].manageable = await ev.manageable;
                } else {
                  guildsRes.data[i].manageable = false;
                }
              }

              apiRes.data.guilds = guildsRes.data;
              res.json({
                code: 0,
                data: apiRes.data,
              });
            })
            .catch((err) => {
              console.log(err.stack);
              console.log(err.response);
              res.json({
                code: 1,
              });
            });
        })
        .catch((err) => {
          console.log(err.message);
          res.json({
            code: 1,
          });
        });
    })
    .catch((err) => {
      console.log(err.message);
      res.json({
        code: 1,
      });
    });
};
