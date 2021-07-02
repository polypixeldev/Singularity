module.exports = {
    name: 'singularity',
    description: 'Your black/white hole!',
    type: 'ms',
    args: ['!<@user>'],
    aliases: ['s'],
    example: 'singularity',
    async execute(msg, msModel, Discord){
		let user = msg.mentions.users.first() ? msg.mentions.users.first() : msg.author;

		let userMS;

		await msModel.findOne({userID: user.id}).then(async function(ms, err){
			console.log(ms);
			if(err !== null && err){
				const errEmbed = new Discord.MessageEmbed()
				.setColor(0x000000)
				.setDescription(`Uhoh, an error occured when trying to fetch your Singularity. If this issue persists, report this bug by sending me a DM starting with 'bug ' and a screenshot of this message. \n \n \`Error:\` \n \`\`\`${err}\`\`\``);
		
				return msg.channel.send(errEmbed);
			} else if(ms === null){
				const newMS = new msModel({
					userID: user.id,
					atoms: 0,
					items: [],
					powerUps: [],
					singularity: {
						type: 'black',
						size: 10,
						ferocity: 0
					}
				});
		
				await newMS.save(function(err){
					if(err !== null && err){
						const errEmbed = new Discord.MessageEmbed()
						.setColor(0x000000)
						.setDescription(`Uhoh, an error occured when recieving this message. If this issue persists, DM poly#3622 with a screenshot of this message. \n \n \`Error:\` \n \`\`\`${err}\`\`\``);
						return msg.channel.send(errEmbed);
					}
				});
				console.log(newMS);
				userMS = newMS;
			}
			userMS = ms;
		});
		
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