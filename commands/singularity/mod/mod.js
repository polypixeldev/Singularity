const Set = require('./set.js');
module.exports = (client, Discord, msg, args, serverDoc) => {
	if(!msg.member.hasPermission('ADMINISTRATOR')){
		const embed = new Discord.MessageEmbed()
		.setColor(0x000000)
		.setDescription('You do not have permission to execute My Singularity moderation commands!');

		return msg.channel.send({embeds: [embed]});
	} else {
		if(args[1] === 'set'){
			Set(client, Discord, msg, args, serverDoc);
		}
	}
}