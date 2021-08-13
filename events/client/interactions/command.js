module.exports = async (Discord, client, interaction) => {
  console.log(
    `Command Interaction Recieved - ${interaction.commandName} from ${interaction.user.tag} in ${interaction.guild.name}`
  );
  if (!client.commands.has(interaction.commandName) || !interaction.guild)
    return;

  let serverDoc;
  await client.utils
    .loadGuildInfo(client, interaction.guild)
    .then(async (server) => {
      serverDoc = server;
    });
  if (serverDoc === "err") return;

  try {
    await client.commands
      .get(interaction.commandName)
      .slashExecute(client, Discord, interaction, serverDoc);
  } catch (error) {
    console.error(error);
    await interaction.editReply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
};
