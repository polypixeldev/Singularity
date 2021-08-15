module.exports = {
  name: "overview",
  description: "An overview of the current server's statistics",
  options: [],
  async slashExecute(client, Discord, interaction) {
    await interaction.deferReply({ ephemeral: true });

    const currentDate = new Date(Date.now());

    const embed = new Discord.MessageEmbed()
      .setColor(0x000000)
      .setTitle(`${interaction.guild.name} - Server Stats`)
      .setDescription("Various statistics about this server")
      .setThumbnail(interaction.guild.iconURL())
      .setFooter(
        `${interaction.guild.name} Server Stats requested by ${
          interaction.user.tag
        } • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`,
        interaction.user.displayAvatarURL()
      )
      .addFields([
        {
          name: "Member Count",
          value: `${interaction.guild.members.cache.size}`,
          inline: true,
        },
        {
          name: "Role Count",
          value: `${interaction.guild.roles.cache.size}`,
          inline: true,
        },
        {
          name: "Owner",
          value: interaction.guild.members.resolve(interaction.guild.ownerId)
            .user.tag,
          inline: true,
        },
        {
          name: "Channel Count",
          value: `${interaction.guild.channels.cache.size}`,
          inline: true,
        },
        {
          name: "ID",
          value: `${interaction.guild.id}`,
          inline: true,
        },
        {
          name: "Date Created",
          value: `${interaction.guild.createdAt.getMonth()}/${interaction.guild.createdAt.getDate()}/${interaction.guild.createdAt.getFullYear()}`,
          inline: true,
        },
      ]);

    interaction.editReply({ embeds: [embed] });
  },
};
