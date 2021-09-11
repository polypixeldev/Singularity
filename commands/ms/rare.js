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

    const rareItems = serverDoc.items.filter((item) => item.rare === true);
    const embed = new client.utils.BaseEmbed(
      `My Singularity - Rare Items`,
      interaction.user
    ).setDescription(
      "These items are **rare**, and cannot be bought from the Singularity shop. Instead, you have a chance to find them when doing special actions, such as prestiging."
    );
    for (let item of rareItems) {
      embed.addField(item.name, item.description);
    }

    interaction.editReply({ embeds: [embed] });
  },
};
