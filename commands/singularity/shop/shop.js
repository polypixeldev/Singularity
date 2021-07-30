const buy = require('./buy.js');
const sell = require('./sell.js');
module.exports = {
	buy: buy,
	sell: sell,
	shop: (client, Discord, msg, args, serverDoc, items, powerUps) => {
		let itemStr = ""
		for(let item in items){
			itemStr = itemStr + `**${items[item].name}**: *${items[item].protons} Protons, ${items[item].electrons} Electrons, ${items[item].darkMatter} Dark Matter* \n`
		}

		let powerStr = "";
		for(let powerup in powerUps){
			powerStr = powerStr + `**${powerUps[powerup].name}**: *${powerUps[powerup].protons} Protons, ${powerUps[powerup].electrons} Electrons, ${powerUps[powerup].darkMatter} Dark Matter* \n `
		}

		const embed = new Discord.MessageEmbed()
		.setColor(0x000000)
		.setTitle(`Singularity Shop`)
		.setDescription(`
			**Items: **
			${itemStr}
			**Power-Ups: **
			${powerStr}
			*Use \`${serverDoc.prefix}singularity shop buy "<item_name>" <!quantity>\` to buy an item!*
		`)
		.setFooter(`Singularity Shop requested by ${msg.author.tag}`, msg.author.displayAvatarURL());
	
		return msg.channel.send(embed);
	}
}