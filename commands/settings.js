const BotSettings = require('./settings/bot/help.js');
const ServerSettings = require('./settings/server/help.js');
const ModSettings = require('./settings/mod/help.js');

module.exports = {
	name: 'settings',
	type: 'mod',
	defaultPermission: true,
	description: 'Singularity Settings',
	options: [],
	aliases: [],
	args: [],
	example: 'settings',
	execute(client, Discord, msg, args, serverDoc){
		if(!msg.member.permissions.has('ADMINISTRATOR')){
			const embed = new Discord.MessageEmbed()
			.setColor(0x000000)
			.setDescription('You do not have permission to view settings!');

			return msg.channel.send({embeds: [embed]});
		} else {
			if(args[0] === 'bot'){
				BotSettings(client, Discord, msg, args, serverDoc);
			} else if(args[0] === 'server'){
				ServerSettings(client, Discord, msg, args, serverDoc);
			} else if(args[0] === 'mod'){
				ModSettings(client, Discord, msg, args, serverDoc);
			} else {
				let currentDate = new Date(Date.now())
				const embed = new Discord.MessageEmbed()
				.setColor(0x000000)
				.setTitle(`Singularity Settings - ${msg.guild.name}`)
				.setDescription(`
					**Bot Settings:** \`${serverDoc.prefix}settings bot\`
	
					**Server Settings:** \`${serverDoc.prefix}settings server\`
	
					**Moderation Settings:** \`${serverDoc.prefix}settings mod\`
				`)
				.setFooter(`Singularity Settings requested by ${msg.author.tag} • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`, msg.author.displayAvatarURL());
	
				return msg.channel.send({embeds: [embed]});
			}
		}
	},
	async slashExecute(client, Discord, interaction, serverDoc){
		await interaction.deferReply({ephemeral: true})
		if(!interaction.member.permissions.has('ADMINISTRATOR')){
			const embed = new Discord.MessageEmbed()
			.setColor(0x000000)
			.setDescription('You do not have permission to view settings!');

			return interaction.editReply({embeds: [embed]});
		} else {
			if(interaction.options.getSubcommandGroup(false) === 'bot'){
				BotSettings.slashExecute(client, Discord, interaction, serverDoc);
			} else if(interaction.options.getSubcommandGroup(false) === 'server'){
				ServerSettings.slashExecute(client, Discord, interaction, serverDoc);
			} else if(interaction.options.getSubcommandGroup(false) === 'mod'){
				ModSettings.slashExecute(client, Discord, interaction, serverDoc);
			} else {
				let currentDate = new Date(Date.now())
				const embed = new Discord.MessageEmbed()
				.setColor(0x000000)
				.setTitle(`Singularity Settings - ${interaction.guild.name}`)
				.setDescription(`
					**Bot Settings:** \`${serverDoc.prefix}settings bot\`
	
					**Server Settings:** \`${serverDoc.prefix}settings server\`
	
					**Moderation Settings:** \`${serverDoc.prefix}settings mod\`
				`)
				.setFooter(`Singularity Settings requested by ${interaction.user.tag} • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`, interaction.user.displayAvatarURL());
	
				return interaction.editReply({embeds: [embed]});
			}
		}
	}
}