const welcomeMessage = require('./server/welcomemessage.js');
const leaveMessage = require('./server/leavemessage.js');
module.exports = (client, Discord, msg, args, serverDoc) => {
	if(args[1] === 'welcome'){
		welcomeMessage(client, Discord, msg, args.slice(2), serverDoc);
	} else if(args[1] === 'leave'){
		leaveMessage(client, Discord, msg, args.slice(2), serverDoc);
	} else {
		let currentDate = new Date(Date.now())
		const embed = new Discord.MessageEmbed()
		.setColor(0x000000)
		.setTitle(`Singularity Server Settings - ${msg.guild.name}`)
		.setDescription(`
			**Set/Toggle a Welcome Message:** \`${serverDoc.prefix}settings server welcome <channel> <message>\`
			 *- Current Setting:* \`${serverDoc.welcomeMessage}\` *in* \`${msg.guild.channels.resolve(serverDoc.welcomeChannelID).name}\`
			**Set/Toggle a Leave Message:** \`${serverDoc.prefix}settings server leave <channel> <message>\`
			 *- Current Setting:* \`${serverDoc.leaveMessage}\` *in* \`${msg.guild.channels.resolve(serverDoc.leaveChannelID).name}\`
		`)
		.setFooter(`Singularity Server Settings requested by ${msg.author.tag} • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`, msg.author.displayAvatarURL());

		return msg.channel.send(embed);
	}
}