module.exports = async (Discord, client, interaction) => {
  console.log(
    `Context Menu Interaction Recieved - ${interaction.commandName} from ${interaction.user.tag} in ${interaction.guild.name}`
  );
  if (!client.contexts.has(interaction.commandName) || !interaction.guild)
    return;

  let serverDoc;
  await client.utils
    .loadGuildInfo(client, interaction.guild)
    .then(async (server) => {
      serverDoc = server;
    });
  if (serverDoc === "err") return;

  try {
    await client.contexts
      .get(interaction.commandName)
      .execute(client, Discord, interaction, serverDoc);
  } catch (e) {
    const embed = new Discord.MessageEmbed()
      .setColor(0x000000)
      .setDescription("An error occured while processing your request");

    return interaction.editReply({ embeds: [embed] });
  }
};
