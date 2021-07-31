module.exports = (client, Discord, msg, args, serverDoc, rareItems) => {
	const embed = new Discord.MessageEmbed()
	.setColor(0x000000)
	.setTitle(`My Singularity - Rare Items`)
	.setDescription('These items are **rare**, and cannot be bought from the Singularity shop. Instead, you have a chance to find them when doing special actions, such as prestiging.');

	for(let item of rareItems){
		embed.addField(item.name, item.description);
	}

	msg.channel.send(embed);
}