module.exports = {
  name: "warn",
  description: "Warn the specified user for the specified reason",
  type: "mod",
  options: [
    {
      name: "user",
      type: "USER",
      description: "The user you wish to warn",
      required: true,
    },
    {
      name: "warning",
      type: "STRING",
      description:
        'The message to warn the user for - defaults to "warned by <your tag>"',
      required: false,
    },
  ],
  async slashExecute(client, Discord, interaction, serverDoc) {
    await interaction.deferReply();

    let user = interaction.options.get("user");

    if (user.member.permissions.has("ADMINISTRATOR")) {
      const permsEmbed = new Discord.MessageEmbed()
        .setDescription("You cannot warn a moderator!")
        .setColor(0x000000);
      return interaction.editReply({ embeds: [permsEmbed] });
    }

    if (!interaction.member.permissions.has("BAN_MEMBERS")) {
      const permsEmbed = new Discord.MessageEmbed()
        .setDescription("You do not have permission to warn!")
        .setColor(0x000000);
      return interaction.editReply({ embeds: [permsEmbed] });
    }

    let userDoc = await client.utils.loadUserInfo(
      client,
      serverDoc,
      user.user.id
    );
    userDoc.warnings.push({
      warner: interaction.user.id,
      timestamp: interaction.createdTimestamp,
      message:
        interaction.options.get("warning")?.value ??
        `User warned by ${interaction.user.tag}`,
    });
    client.utils.updateServer(
      client,
      serverDoc.guildID,
      userDoc.userID,
      userDoc
    );
    const embed = new Discord.MessageEmbed()
      .setColor(0x000000)
      .setDescription(
        `Successfully warned \`${user.user.tag}\` for \`${
          interaction.options.get("warning")?.value ??
          `User warned by ${interaction.user.tag}`
        }\``
      );

    interaction.editReply({ embeds: [embed] });
  },
};
