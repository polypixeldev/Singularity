module.exports = {
  name: "Kick User",
  type: "USER",
  execute(client, Discord, interaction, serverDoc) {
    require("../commands/kick.js").slashExecute(
      client,
      Discord,
      interaction,
      serverDoc
    );
  },
};
