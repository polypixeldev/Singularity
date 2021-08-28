module.exports = (discord, client, req, res) => {
  discord
    .get("https://discord.com/api/users/@me")
    .then(async (apiRes) => {
      let ev = { code: 1 };
      client.emit(
        "updateGuild",
        ev,
        apiRes.data.id,
        req.body.guildID,
        req.body.data
      );
      res.json({
        code: await ev.code,
      });
    })
    .catch((err) => {
      console.log(err.stack);
      console.log(err.response);
      res.json({
        code: 1,
      });
    });
};
