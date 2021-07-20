module.exports = {
    name: 'singularity',
    description: 'Your black/white hole!',
    type: 'ms',
    args: ['!<@user | upgrade | shop>'],
    aliases: ['s'],
    example: 'singularity',
    async execute(client, Discord, msg, args, serverDoc){
		if(args[0] === 'upgrade'){
			let userMS = await client.utils.loadMsInfo(serverDoc, msg.author.id);
			let limit = -1;
			let remaining = {
				protons: userMS.protons,
				electrons: userMS.electrons
			}
			remaining.protons -= userMS.singularity.size * 100;
			remaining.electrons -= userMS.singularity.size * 25;
			do {
				remaining.protons -= 5000;
				remaining.electrons -= 1000;
				limit++;
			} while(remaining.protons > 0 && remaining.electrons > 0)

			const embed = new Discord.MessageEmbed()
			.setColor(0x000000)
			.setDescription(`
				**Current Singularity Size:** *${userMS.singularity.size}*
				**Current Protons:** *${userMS.protons}*
				**Current Electrons:** *${userMS.electrons}*

				**Amount of Protons Per Additional Upgrade:** *5000*
				**Amount of Electrons Per Additional Upgrade:** *1000*
				**Current Size Fee:** *${userMS.singularity.size * 100} Protons & ${userMS.singularity.size * 25} Electons*

				**Maximum Upgrades Available: ** *${limit}*

				*Respond with the desired upgrade number within 30 seconds, or respond with 0 to abort*
			`)
			.setFooter(`Upgrade info requested by ${msg.author.tag}`, msg.author.displayAvatarURL());
			msg.channel.send(embed);

			msg.channel.awaitMessages(message => message.author.id === msg.author.id && Number.isInteger(Number(message.content)), {max: 1, time: 30000, errors: ['time']})
			.then(collection => {
				let num = Number(collection.first().content)
				if(num > limit){
					const embed = new Discord.MessageEmbed()
					.setColor(0x000000)
					.setDescription('You do not have enough protons/electrons to upgrade your Singularity size this much!');

					return msg.channel.send(embed);
				} else if(num <= 0){
					const embed = new Discord.MessageEmbed()
					.setColor(0x000000)
					.setDescription('Upgrade Aborted.')

					return msg.channel.send(embed);
				} else {
					userMS.electrons -= num * 1000;
					userMS.protons -= num * 5000;
					userMS.electrons -= userMS.singularity.size * 25;
					userMS.protons -= userMS.singularity.size * 100;
					userMS.singularity.size += (Math.random() * 9) + 1;
					serverDoc.markModified('ms');
					serverDoc.save().then(() => {
						const embed = new Discord.MessageEmbed()
						.setColor(0x000000)
						.setDescription(`Congrats! Your Singularity is now size \`${userMS.singularity.size}\`!`);

						return msg.channel.send(embed);
					})
				}
			})
			.catch(() => {
				const embed = new Discord.MessageEmbed()
				.setColor(0x000000)
				.setDescription('You did not respond with a valid number in time.');
				return msg.channel.send(embed);
			});

		} else {
			let user = msg.mentions.users.first() ? msg.mentions.users.first() : msg.author;
			console.log(user.id);
			let userMS = await client.utils.loadMsInfo(serverDoc, user.id);
			
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