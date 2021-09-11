module.exports = {
  name: "view",
  description: "The Singularity Shop",
  type: "ms",
  options: [
    {
      name: "item",
      description: "The name of the item you wish to view",
      type: "STRING",
      required: false,
    },
  ],
  example: "ms shop",
  async slashExecute(client, Discord, interaction, serverDoc) {
    await interaction.deferReply({ ephemeral: true });

    const items = serverDoc.items;

    if (interaction.options.get("item")) {
      const item = items.find(
        (item) => item.name === interaction.options.get("item").value
      );
      if (item) {
        const embed = client.utils
          .BaseEmbed(`Singularity Shop - ${item.name}`, interaction.user)
          .setDescription(
            `*Use \`${serverDoc.prefix}ms shop buy ${item.name} <!quantity>\` to buy this item!*`
          )
          .addFields([
            {
              name: "Description",
              value: item.description,
              inline: true,
            },
            {
              name: "Price",
              value: `${item.protons} Protons, ${item.electrons} Electrons, ${item.darkMatter} Dark Matter`,
              inline: true,
            },
            {
              name: "Effects",
              value: item.effects,
              inline: true,
            },
          ]);

        return interaction.editReply({ embeds: [embed] });
      } else {
        const embed = new Discord.MessageEmbed()
          .setColor(0x000000)
          .setDescription("The specified item does not exist!");

        return interaction.editReply({ embeds: [embed] });
      }
    } else {
      let itemStr = "";
      for (let item in items) {
        itemStr =
          itemStr +
          `**${items[item].name}**: *${items[item].protons} Protons, ${items[item].electrons} Electrons, ${items[item].darkMatter} Dark Matter* \n`;
      }

      const embed = new client.utils.BaseEmbed(
        "Singularity Shop",
        interaction.user
      ).setDescription(
        `
        *Use \`${serverDoc.prefix}ms shop view <item_name>\` to get a closer look at an item!
      **Items: **
      ${itemStr}
      *Use \`${serverDoc.prefix}singularity shop buy "<item_name>" <!quantity>\` to buy an item!*
    `
      );

      return interaction.editReply({ embeds: [embed] });
    }
  },
};
