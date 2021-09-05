module.exports = {
  name: "infractions",
  description: "Displays the infractions for the specified user",
  type: "mod",
  options: [
    {
      name: "user",
      description: "The user you wish to view",
      type: "USER",
      required: true,
    },
  ],
  async slashExecute(client, Discord, interaction, serverDoc) {
    await interaction.deferReply({ ephemeral: true });

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

    const userDoc = await client.utils.loadUserInfo(
      client,
      serverDoc,
      user.user.id
    );

    const currentDate = new Date(Date.now());
    const embed = new Discord.MessageEmbed()
      .setColor(0x000000)
      .setTitle(`Infractions for ${user.user.tag}`)
      .setFooter(
        `${user.user.tag}'s infractions requested by ${
          interaction.user.tag
        } • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`,
        interaction.user.displayAvatarURL()
      );

    if (userDoc.infractions.length > 0) {
      for (let infraction of userDoc.infractions) {
        let timestamp = new Date(infraction.timestamp);
        embed.addField(
          `**${timestamp.getUTCMonth()}/${timestamp.getUTCDate()}/${timestamp.getUTCFullYear()}** - ${
            infraction.type
          } from ${infraction.modTag}`,
          infraction.message,
          false
        );
      }
    } else {
      embed.setDescription("The specified user has no infractions!");
    }

    interaction.editReply({ embeds: [embed] });
  },
};
