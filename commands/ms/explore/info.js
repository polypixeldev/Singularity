module.exports = {
  name: "info",
  description: "Information on My Singularity Explore",
  options: [],
  example: "ms explore info",
  async slashExecute(client, Discord, interaction) {
    await interaction.deferReply({ ephemeral: true });

    const currentDate = new Date(Date.now());
    const embed = new Discord.MessageEmbed()
      .setColor(0x000000)
      .setTitle("My Singularity Explore")
      .setDescription(
        "***My Singularity Explore is a way to earn rewards and learn something new along the way!***"
      )
      .addFields([
        {
          name: "What is My Singularity Explore?",
          value: `
					*(not yet implemented, check back here later for more information)*
				`,
          inline: false,
        },
      ])
      .setFooter(
        `My Singularity Explore info requested by ${
          interaction.user.tag
        } • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`,
        interaction.user.displayAvatarURL()
      );

    return interaction.editReply({ embeds: [embed] });
  },
};
