module.exports = {
  name: "Unmute User",
  type: "USER",
  execute(client, Discord, interaction) {
    require("../commands/unmute.js").slashExecute(client, Discord, interaction);
  },
};
