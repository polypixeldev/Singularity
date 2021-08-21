module.exports = async (client, ev, guildID) => {
  ev.available = !client.guilds.cache.get(guildID) ? false : true;
};
