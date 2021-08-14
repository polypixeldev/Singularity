module.exports = {
  name: "View Singularity",
  type: "USER",
  execute(client, Discord, interaction, serverDoc) {
    require("../commands/mysingularity/view.js").slashExecute(
      client,
      Discord,
      interaction,
      serverDoc
    );
  },
};
