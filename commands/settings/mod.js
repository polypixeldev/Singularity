module.exports = (client, Discord, msg, args) => {
	if(args[1] === ''){
		//eslint-disable-line
	} else {
		let currentDate = new Date(Date.now())
		const embed = new Discord.MessageEmbed()
		.setColor(0x000000)
		.setTitle(`Singularity Mod Settings - ${msg.guild.name}`)
		.setDescription(`

		`)
		.setFooter(`Singularity Mod Settings requested by ${msg.author.tag}  • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`, msg.author.displayAvatarURL());

		return msg.channel.send(embed);
	}
}