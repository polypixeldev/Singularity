module.exports = {
  name: "use",
  description: "Use an item!",
  type: "ms",
  options: [
    {
      name: "item",
      description: "The name of the item you want to use",
      type: "STRING",
      required: true,
    },
  ],
  args: [],
  aliases: [],
  example: 'ms use "2x Proton Boost"',
  async slashExecute(client, Discord, interaction, serverDoc) {
    await interaction.deferReply({ ephemeral: true });
    let userMS = await client.utils.loadUserInfo(
      client,
      serverDoc,
      interaction.user.id
    );
    let selectedItem;

    const items = serverDoc.items;

    for (let item of items) {
      if (item.name === interaction.options.get("item").value) {
        selectedItem = item;
      }
    }

    if (!selectedItem) {
      const embed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setDescription("Please enter the name of the item you wish to use!");

      return interaction.editReply({ embeds: [embed] });
    }

    if (!selectedItem.useable) {
      const embed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setDescription("This item is not useable!");

      return interaction.editReply({ embeds: [embed] });
    }

    if (!userMS.items.includes(interaction.options.get("item").value)) {
      const embed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setDescription("You do not own this item!");

      return interaction.editReply({ embeds: [embed] });
    }

    const embed = client.utils.manageUse.activate(
      client,
      Discord,
      userMS,
      selectedItem
    );

    return interaction.editReply({ embeds: [embed] });
  },
};
