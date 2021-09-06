module.exports = {
  name: "View Singularity",
  type: "USER",
  execute(client, Discord, interaction, serverDoc) {
    require("../commands/ms/view.js").slashExecute(
      client,
      Discord,
      interaction,
      serverDoc
    );
  },
};
