module.exports = (client, Discord, msg, args, serverDoc, rareItems) => {
	let currentDate = new Date(Date.now())
	const embed = new Discord.MessageEmbed()
	.setColor(0x000000)
	.setTitle(`My Singularity - Rare Items`)
	.setDescription('These items are **rare**, and cannot be bought from the Singularity shop. Instead, you have a chance to find them when doing special actions, such as prestiging.')
	.setFooter(`Rare item list requested by ${msg.author.tag} • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`)
	for(let item of rareItems){
		embed.addField(item.name, item.description);
	}

	msg.channel.send({embeds: [embed]});
}