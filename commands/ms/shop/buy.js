module.exports = {
  name: "buy",
  description: "Buy an item from the Singularity Shop!",
  type: "ms",
  options: [
    {
      name: "item",
      description: "The name of the item you want to buy",
      type: "STRING",
      required: true,
    },
    {
      name: "quantity",
      description: "How many of the item you want to buy - defaults to 1",
      type: "INTEGER",
      required: false,
    },
  ],
  args: [],
  aliases: [],
  example: "ms buy trophy",
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
      //eslint-disable-line no-prototype-builtins
      const embed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setDescription("That is not a valid item!");

      return interaction.editReply({ embeds: [embed] });
    }

    let quantity = interaction.options.get("quantity")?.value;
    if (!quantity) quantity = 1;

    if (
      userMS.protons >= selectedItem.protons * quantity &&
      userMS.electrons >= selectedItem.electrons * quantity &&
      userMS.darkMatter >= selectedItem.darkMatter * quantity
    ) {
      userMS.protons -= selectedItem.protons * quantity;
      userMS.electrons -= selectedItem.electrons * quantity;
      userMS.darkMatter -= selectedItem.darkMatter * quantity;

      userMS.items.push(interaction.options.get("item").value);

      client.utils
        .updateUser(client, serverDoc.guildID, userMS.userID, {
          protons: userMS.protons,
          electrons: userMS.electrons,
          darkMatter: userMS.darkMatter,
          items: userMS.items,
        })
        .then(() => {
          const embed = new Discord.MessageEmbed().setColor(0x000000)
            .setDescription(`
					Purchase completed!

					\t + **${quantity}** ${interaction.options.get("item").value}
					\t - **${selectedItem.protons * quantity}** Protons
					\t - **${selectedItem.electrons * quantity}** Electrons
					\t - **${selectedItem.darkMatter * quantity}** Dark Matter

					You now have:
					\t **${userMS.protons}** Protons
					\t **${userMS.electrons}** Electrons
					\t **${userMS.darkMatter}** Dark Matter
				`);

          return interaction.editReply({ embeds: [embed] });
        });
    } else {
      let missingArr = [
        userMS.protons - selectedItem.protons * quantity,
        userMS.electrons - selectedItem.electrons * quantity,
        userMS.darkMatter - selectedItem.darkMatter * quantity,
      ];

      missingArr = missingArr.map((type) => {
        if (type > 0) {
          type = 0;
        } else {
          console.log(type);
          type = Math.abs(type);
          console.log(type);
        }

        return type;
      });

      const embed = new Discord.MessageEmbed().setColor(0x000000)
        .setDescription(`
				You do not have enough resources needed to buy this item!

				Missing:
				 - **${missingArr[0]}** Protons
				 - **${missingArr[1]}** Electrons
				 - **${missingArr[2]}** Dark Matter
			`);

      return interaction.editReply({ embeds: [embed] });
    }
  },
};
