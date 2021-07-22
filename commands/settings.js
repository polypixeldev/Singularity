const BotSettings = require('./settings/bot.js');
const ServerSettings = require('./settings/server.js');
const ModSettings = require('./settings/mod.js');

module.exports = {
	name: 'settings',
	type: 'mod',
	description: 'Singularity Settings',
	aliases: [],
	args: [],
	example: 'settings',
	execute(client, Discord, msg, args, serverDoc){
		if(!msg.member.hasPermission('ADMINISTRATOR')){
			const embed = new Discord.MessageEmbed()
			.setColor(0x000000)
			.setDescription('You do not have permission to view settings!');

			return msg.channel.send(embed);
		} else {
			if(args[0] === 'bot'){
				BotSettings(client, Discord, msg, args, serverDoc);
			} else if(args[0] === 'server'){
				ServerSettings(client, Discord, msg, args, serverDoc);
			} else if(args[0] === 'mod'){
				ModSettings(client, Discord, msg, args, serverDoc);
			} else {
				const embed = new Discord.MessageEmbed()
				.setColor(0x000000)
				.setTitle(`Singularity Settings - ${msg.guild.name}`)
				.setDescription(`
					**Bot Settings:** \`${serverDoc.prefix}settings bot\`
	
					**Server Settings:** \`${serverDoc.prefix}settings server\`
	
					**Moderation Settings:** \`${serverDoc.prefix}settings mod\`
				`)
				.setFooter(`Singularity Settings requested by ${msg.author.tag}`, msg.author.displayAvatarURL());
	
				return msg.channel.send(embed);
			}
		}
	}
}