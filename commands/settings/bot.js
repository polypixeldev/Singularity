const prefix = require('./bot/prefix.js');
const nickname = require('../nickname.js');
const kick = require('./bot/kick.js');
module.exports = (client, Discord, msg, args, serverDoc) => {
	if(args[1] === 'prefix'){
		prefix.execute(client, Discord, msg, args.slice(2), serverDoc);
	} else if(args[1] === 'nickname'){
		msg.mentions.users = new Discord.Collection();
		nickname.execute(client, Discord, msg, args.slice(2), serverDoc);
	} else if(args[1] === 'kick'){
		kick(client, Discord, msg);
	} else {
		let currentDate = new Date(Date.now())
		
		const embed = new Discord.MessageEmbed()
		.setColor(0x000000)
		.setTitle(`Singularity Bot Settings - ${msg.guild.name}`)
		.setDescription(`
			**Change Prefix:** \`${serverDoc.prefix}settings bot prefix <prefix>\`
			 *- Current Setting:* \`${serverDoc.prefix}\`
			**Nickname Me:**  \`${serverDoc.prefix}settings bot nickname <nickname>\`
			 *- Current Setting:* \`${msg.guild.members.resolve(client.user).nickname ? msg.guild.members.resolve(client.user).nickname : 'None'}\`
			**Kick Me:** \`${serverDoc.prefix}settings bot kick\`
		`)
		.setFooter(`Singularity Bot Settings requested by ${msg.author.tag}  • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`, msg.author.displayAvatarURL());

		return msg.channel.send({embeds: [embed]});
	}
}