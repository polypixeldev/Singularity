module.exports = {
    name: 'singularity',
    description: 'Your black/white hole!',
    type: 'ms',
    args: ['!<@user>'],
    aliases: ['s'],
    example: 'singularity',
    async execute(client, Discord, msg){
		let serverDoc = await client.utils.get('loadGuildInfo').execute(client, msg.guild);
		let user = msg.mentions.users.first() ? msg.mentions.users.first() : msg.author;
		let userMS = await client.utils.get('loadMsInfo').execute(serverDoc, user.id);
		
		let itemStr = ''
		for(let item of userMS.items){
			itemStr = itemStr + `- ${item} \n `;
		}

		let pStr = ''
		for(let p of userMS.powerUps){
			pStr = pStr + `- ${p} \n `;
		}

		const embed = new Discord.MessageEmbed()
		.setTitle(`${user.tag}'s Singularity`)
		.setColor(0x000000)
		.setThumbnail('https://cdn.discordapp.com/avatars/835256019336036423/05dde3d48f1a67659be4837607746eb7.webp')
		.setDescription(`
			------User Stats------
			Atoms: ${userMS.atoms}
			Items: ${itemStr}
			Power-Ups: ${pStr}

			------Singularity Stats------
			Singularity Type: ${userMS.singularity.type}
			Singularity Size: ${userMS.singularity.size}
			Singularity Ferocity: ${userMS.singularity.ferocity}
		`)
		.setFooter(`${user.tag}'s Singularity requested by ${msg.author.tag}`, msg.author.displayAvatarURL());

		msg.channel.send(embed);
		
	}
}