module.exports = {
  name: "sell",
  description: "Sell an item to the Singularity Shop!",
  type: "ms",
  options: [
    {
      name: "item",
      description: "The name of the item/power-up you want to sell",
      type: "STRING",
      required: true,
    },
    {
      name: "quantity",
      description: "How many of the item you want to sell - defaults to 1",
      type: "INTEGER",
      required: false,
    },
  ],
  args: [],
  aliases: [],
  example: "ms shop sell trophy",
  async execute(client, Discord, msg, args, serverDoc, items, powerUps) {
    let userMS = await client.utils.loadUserInfo(
      client,
      serverDoc,
      msg.author.id
    );
    let selectedItem;

    for (let item in items) {
      if (items[item].name === args[2]) {
        selectedItem = ["item", items[item]];
      }
    }

    for (let powerup in powerUps) {
      if (powerUps[powerup].name === args[2]) {
        selectedItem = ["powerup", powerUps[powerup]];
      }
    }

    if (!selectedItem) {
      const embed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setDescription("Please enter the name of the item you wish to sell!");

      return msg.channel.send({ embeds: [embed] });
    }

    if (!userMS.items.includes(args[2]) && !userMS.powerUps.includes(args[2])) {
      const embed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setDescription("You do not own this item!");

      return msg.channel.send({ embeds: [embed] });
    }

    if (!args[3]) args[3] = 1;

    let protons = (selectedItem[1].protons * args[3]) / 2;
    let electrons = (selectedItem[1].electrons * args[3]) / 2;
    let darkMatter = (selectedItem[1].darkMatter * args[3]) / 2;

    let removed = 0;
    if (selectedItem[0] === "item") {
      for (let i = 0; i < userMS.items.length; i++) {
        if (userMS.items[i] === args[2] && removed <= args[3]) {
          userMS.items.splice(i, 1);
          removed++;
        }
      }
    } else {
      for (let i = 0; i < userMS.powerUps.length; i++) {
        if (userMS.powerUps[i] === args[2] && removed <= args[3]) {
          userMS.powerUps.splice(i, 1);
          removed++;
        }
      }
    }

    if (removed < args[3]) {
      const embed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setDescription("You do not have that many of the specified item!");

      return msg.channel.send({ embeds: [embed] });
    }
    userMS.protons += protons;
    userMS.electrons += electrons;
    userMS.darkMatter += darkMatter;

    client.utils
      .updateUser(client, serverDoc.guildID, userMS.userID, userMS)
      .then(() => {
        const embed = new Discord.MessageEmbed().setColor(0x000000)
          .setDescription(`
				Sell completed!

				\t - **${args[3]}** ${args[2]}
				\t + **${protons * args[3]}** Protons
				\t + **${electrons}** Electrons
				\t + **${darkMatter}** Dark Matter

				You now have:
				\t **${userMS.protons}** Protons
				\t **${userMS.electrons}** Electrons
				\t **${userMS.darkMatter}** Dark Matter
			`);

        return msg.channel.send({ embeds: [embed] });
      });
  },
  async slashExecute(client, Discord, interaction, serverDoc, items, powerUps) {
    let userMS = await client.utils.loadUserInfo(
      client,
      serverDoc,
      interaction.user.id
    );
    let selectedItem;

    for (let item in items) {
      if (items[item].name === interaction.options.get("item").value) {
        selectedItem = ["item", items[item]];
      }
    }

    for (let powerup in powerUps) {
      if (powerUps[powerup].name === interaction.options.get("item").value) {
        selectedItem = ["powerup", powerUps[powerup]];
      }
    }

    if (!selectedItem) {
      const embed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setDescription("Please enter the name of the item you wish to sell!");

      return interaction.editReply({ embeds: [embed] });
    }

    if (
      !userMS.items.includes(interaction.options.get("item").value) &&
      !userMS.powerUps.includes(interaction.options.get("item").value)
    ) {
      const embed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setDescription("You do not own this item!");

      return interaction.editReply({ embeds: [embed] });
    }

    let quantity = interaction.options.get("quantity")?.value;

    if (!quantity) quantity = 1;

    let protons = (selectedItem[1].protons * quantity) / 2;
    let electrons = (selectedItem[1].electrons * quantity) / 2;
    let darkMatter = (selectedItem[1].darkMatter * quantity) / 2;

    let removed = 0;
    if (selectedItem[0] === "item") {
      for (let i = 0; i < userMS.items.length; i++) {
        if (
          userMS.items[i] === interaction.options.get("item").value &&
          removed <= quantity
        ) {
          userMS.items.splice(i, 1);
          removed++;
        }
      }
    } else {
      for (let i = 0; i < userMS.powerUps.length; i++) {
        if (
          userMS.powerUps[i] === interaction.options.get("item").value &&
          removed <= quantity
        ) {
          userMS.powerUps.splice(i, 1);
          removed++;
        }
      }
    }

    if (removed < quantity) {
      const embed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setDescription("You do not have that many of the specified item!");

      return interaction.editReply({ embeds: [embed] });
    }
    userMS.protons += protons;
    userMS.electrons += electrons;
    userMS.darkMatter += darkMatter;

    client.utils
      .updateUser(client, serverDoc.guildID, userMS.userID, userMS)
      .then(() => {
        const embed = new Discord.MessageEmbed().setColor(0x000000)
          .setDescription(`
				Sell completed!

				\t - **${quantity}** ${interaction.options.get("item").value}
				\t + **${protons}** Protons
				\t + **${electrons}** Electrons
				\t + **${darkMatter}** Dark Matter

				You now have:
				\t **${userMS.protons}** Protons
				\t **${userMS.electrons}** Electrons
				\t **${userMS.darkMatter}** Dark Matter
			`);

        return interaction.editReply({ embeds: [embed] });
      });
  },
};
