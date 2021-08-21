module.exports = async (client, ev, guildID, userID) => {
  ev.available = !client.guilds.cache.get(guildID) ? false : true;
  if (!ev.available) return;
  ev.manageable = new Promise((resolve, reject) => {
    client.guilds.cache
      .get(guildID)
      .members.fetch(userID)
      .then(() => {
        resolve(
          client.guilds.cache
            .get(guildID)
            .members.cache.get(userID)
            .permissions.has("MANAGE_GUILD")
        );
      })
      .catch((err) => {
        reject(err);
      });
  });
};
