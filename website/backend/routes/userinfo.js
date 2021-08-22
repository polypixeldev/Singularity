const { BitField } = require("discord.js");
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
              let promises = [];
              for (let i = 0; i < guildsRes.data.length; i++) {
                let ev = { available: false, data: null };

                client.emit("guildAvailable", ev, guildsRes.data[i].id);

                guildsRes.data[i].available = ev.available;
                let permissions = new BitField(guildsRes.data[i].permissions);
                guildsRes.data[i].manageable = permissions.has(1 << 5);
                if (ev.data)
                  promises.push(
                    ev.data.then((data) => (guildsRes.data[i].data = data))
                  );
              }

              await Promise.all(promises);

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
