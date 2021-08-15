module.exports = {
  name: "mysingularity",
  description: "My Singularity statistics for this server",
  options: [],
  async slashExecute(client, Discord, interaction, serverDoc) {
    await interaction.deferReply({ ephemeral: true });

    await serverDoc.populate("ms").execPopulate();

    let totalProtons = serverDoc.ms.reduce((acc, val) => acc + val.protons, 0);

    let totalElectrons = serverDoc.ms.reduce(
      (acc, val) => acc + val.electrons,
      0
    );

    let totalDarkMatter = serverDoc.ms.reduce(
      (acc, val) => acc + val.darkMatter,
      0
    );

    const currentDate = new Date(Date.now());

    const embed = new Discord.MessageEmbed()
      .setColor(0x000000)
      .setTitle(`${interaction.guild.name} - My Singularity Stats`)
      .setDescription("My Singularity statistics for this server")
      .setThumbnail(interaction.guild.iconURL())
      .setFooter(
        `${interaction.guild.name} My Singularity Stats requested by ${
          interaction.user.tag
        } • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`,
        interaction.user.displayAvatarURL()
      )
      .addFields([
        {
          name: "Total Protons",
          value: `${totalProtons}`,
          inline: true,
        },
        {
          name: "Total Electrons",
          value: `${totalElectrons}`,
          inline: true,
        },
        {
          name: "Total Dark Matter",
          value: `${totalDarkMatter}`,
          inline: true,
        },
      ]);

    interaction.editReply({ embeds: [embed] });
  },
};
