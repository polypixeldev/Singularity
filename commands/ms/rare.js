module.exports = {
  name: "rare",
  description: "Display the list of Rare Items",
  type: "ms",
  args: [],
  aliases: [],
  example: "ms rare",
  options: [],
  async slashExecute(client, Discord, interaction, serverDoc) {
    await interaction.deferReply({ ephemeral: true });
    let currentDate = new Date(Date.now());

    const rareItems = serverDoc.items.filter((item) => item.rare === true);
    const embed = new Discord.MessageEmbed()
      .setColor(0x000000)
      .setTitle(`My Singularity - Rare Items`)
      .setDescription(
        "These items are **rare**, and cannot be bought from the Singularity shop. Instead, you have a chance to find them when doing special actions, such as prestiging."
      )
      .setFooter(
        `Rare item list requested by ${
          interaction.user.tag
        } • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`,
        interaction.user.displayAvatarURL()
      );
    for (let item of rareItems) {
      embed.addField(item.name, item.description);
    }

    interaction.editReply({ embeds: [embed] });
  },
};
