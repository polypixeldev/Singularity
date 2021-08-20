module.exports = {
  name: "Mute User",
  type: "USER",
  execute(client, Discord, interaction) {
    require("../commands/mute.js").slashExecute(client, Discord, interaction);
  },
};
