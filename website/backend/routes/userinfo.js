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
                if (guildsRes.data[i].icon !== null) {
                  let avatar = await discord.get(
                    `https://cdn.discordapp.com/icons/${guildsRes.data[i].id}/${guildsRes.data[i].icon}.png`,
                    {
                      responseType: "arraybuffer",
                    }
                  );
                  guildsRes.data[i].icon = Buffer.from(
                    avatar.data,
                    "binary"
                  ).toString("base64");

                  let ev = { available: false };

                  client.emit("guildAvailable", guildsRes.data[i].id, ev);

                  guildsRes.data[i].available = ev.available;

                  console.log(
                    `${guildsRes.data[i].name}: ${guildsRes.data[i].available}`
                  );
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
