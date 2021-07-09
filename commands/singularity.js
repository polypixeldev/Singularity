module.exports = {
    name: 'singularity',
    description: 'Your black/white hole!',
    type: 'ms',
    args: ['!<@user | upgrade | shop>'],
    aliases: ['s'],
    example: 'singularity',
    async execute(client, Discord, msg, args, serverDoc){
		if(args[0] === 'upgrade'){
			let userMS = await client.utils.loadMSInfo(serverDoc, msg.author.id);

		} else {
			let user = msg.mentions.users.first() ? msg.mentions.users.first() : msg.author;
			console.log(user.id);
			let userMS = await client.utils.loadMsInfo(serverDoc, user.id);
			console.log('i think fetched');
			
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
				Protons: ${userMS.protons}
				Electrons: ${userMS.electrons}
				Dark Matter: ${userMS.darkMatter}
				Items: ${itemStr}
				Power-Ups: ${pStr}
				Lifetime Experience: ${userMS.lifeExp}

				------Singularity Stats------
				Singularity Type: ${userMS.singularity.type}
				Singularity Size: ${userMS.singularity.size}
				Singularity Ferocity: ${userMS.singularity.ferocity}
			`)
			.setFooter(`${user.tag}'s Singularity requested by ${msg.author.tag}`, msg.author.displayAvatarURL());

			msg.channel.send(embed);
			
		}
	}	
}