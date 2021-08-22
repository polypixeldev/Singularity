module.exports = (client, ev, userID, guildID, data) => {
  let member = client.guilds.cache.get(guildID)?.members.fetch(userID);
  if (!member) return (ev.code = 2);
  let cleanData = {};
  for (let prop in data) {
    if (data[prop]) cleanData[prop] = data[prop];
  }
  client.utils.updateServer(client, guildID, cleanData);
  return (ev.code = 0);
};
