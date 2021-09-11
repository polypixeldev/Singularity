function getTimeRemaining(endtime) {
  const total = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  };
}

module.exports = {
  name: "status",
  description: "Displays the current Explore status",
  options: [],
  example: "ms explore status",
  async slashExecute(client, Discord, interaction) {
    await interaction.deferReply({ ephemeral: true });

    const currentDate = new Date(Date.now());
    const startDay = 1; //0=sunday, 1=monday etc.
    const d = currentDate.getDay(); //get the current day
    const weekStart = new Date(
      currentDate.valueOf() - (d <= 0 ? 7 - startDay : d - startDay) * 86400000
    ); //rewind to start day
    const weekEnd = new Date(
      new Date(weekStart.valueOf() + 6 * 86400000).setHours(
        24 - currentDate.getHours()
      )
    ); //add 6 days to get last day
    let timeRemaining = getTimeRemaining(weekEnd);

    const embed = new Discord.MessageEmbed()
      .setColor(0x000000)
      .setTitle("My Singularity Explore Status")
      .setDescription(
        `**Explore status for the week of ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()}**`
      )
      .addFields(
        {
          name: "Time Remaining",
          value: `${timeRemaining.days} Days, ${timeRemaining.hours} Hours`,
          inline: true,
        },
        {
          name: "Progress",
          value: `*(to be implemented)*`,
          inline: true,
        },
        {
          name: "Global Completions",
          value: `*(to be implemented)*`,
          inline: true,
        }
      )
      .setFooter(
        `My Singularity Explore info requested by ${
          interaction.user.tag
        } • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`,
        interaction.user.displayAvatarURL()
      );

    interaction.editReply({ embeds: [embed] });
  },
};
