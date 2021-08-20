module.exports = (client, id, ev) => {
  ev.available = !client.guilds.cache.get(id) ? false : true;
};
