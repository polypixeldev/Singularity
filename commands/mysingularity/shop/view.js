const buy = require("./buy.js");
const sell = require("./sell.js");
module.exports = {
  name: "view",
  description: "The Singularity Shop",
  type: "ms",
  options: [],
  args: [],
  aliases: [],
  example: "ms shop",
  execute(client, Discord, msg, args, serverDoc, items, powerUps) {
    if (args[1] === "buy") {
      buy.execute(client, Discord, msg, args, serverDoc, items, powerUps);
    } else if (args[1] === "sell") {
      sell.execute(client, Discord, msg, args, serverDoc, items, powerUps);
    } else {
      let itemStr = "";
      for (let item in items) {
        itemStr =
          itemStr +
          `**${items[item].name}**: *${items[item].protons} Protons, ${items[item].electrons} Electrons, ${items[item].darkMatter} Dark Matter* \n`;
      }

      let powerStr = "";
      for (let powerup in powerUps) {
        powerStr =
          powerStr +
          `**${powerUps[powerup].name}**: *${powerUps[powerup].protons} Protons, ${powerUps[powerup].electrons} Electrons, ${powerUps[powerup].darkMatter} Dark Matter* \n `;
      }

      let currentDate = new Date(Date.now());

      const embed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setTitle(`Singularity Shop`)
        .setDescription(
          `
				**Items: **
				${itemStr}
				**Power-Ups: **
				${powerStr}
				*Use \`${serverDoc.prefix}singularity shop buy "<item_name>" <!quantity>\` to buy an item!*
			`
        )
        .setFooter(
          `Singularity Shop requested by ${
            msg.author.tag
          } • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`,
          msg.author.displayAvatarURL()
        );

      return msg.channel.send(embed);
    }
  },
  async slashExecute(client, Discord, interaction, serverDoc, items, powerUps) {
    if (interaction.options.getSubcommand(false) === "buy") {
      buy.slashExecute(
        client,
        Discord,
        interaction,
        serverDoc,
        items,
        powerUps
      );
    } else if (interaction.options.getSubcommand(false) === "sell") {
      sell.slashExecute(
        client,
        Discord,
        interaction,
        serverDoc,
        items,
        powerUps
      );
    } else {
      let itemStr = "";
      for (let item in items) {
        itemStr =
          itemStr +
          `**${items[item].name}**: *${items[item].protons} Protons, ${items[item].electrons} Electrons, ${items[item].darkMatter} Dark Matter* \n`;
      }

      let powerStr = "";
      for (let powerup in powerUps) {
        powerStr =
          powerStr +
          `**${powerUps[powerup].name}**: *${powerUps[powerup].protons} Protons, ${powerUps[powerup].electrons} Electrons, ${powerUps[powerup].darkMatter} Dark Matter* \n `;
      }

      let currentDate = new Date(Date.now());

      const embed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setTitle(`Singularity Shop`)
        .setDescription(
          `
				**Items: **
				${itemStr}
				**Power-Ups: **
				${powerStr}
				*Use \`${serverDoc.prefix}singularity shop buy "<item_name>" <!quantity>\` to buy an item!*
			`
        )
        .setFooter(
          `Singularity Shop requested by ${
            interaction.user.tag
          } • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`,
          interaction.user.displayAvatarURL()
        );

      return interaction.editReply({ embeds: [embed] });
    }
  },
};
