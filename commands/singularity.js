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
					});
				}
			})
			.catch(() => {
				const embed = new Discord.MessageEmbed()
				.setColor(0x000000)
				.setDescription('You did not respond with a valid number in time.');
				return msg.channel.send(embed);
			});

		} else if(args[0] === 'shop'){
			const items = {
				tiny_trophy: {
					protons: 1000000,
					electrons: 500000,
					darkMatter: 0
				},
				trophy: {
					protons: 10000000,
					electrons: 1000000,
					darkMatter: 1
				},
				giant_trophy: {
					protons: 1000000000,
					electrons: 10000000,
					darkMatter: 5
				}
			}

			if(args[1] === 'buy'){
				let userMS = await client.utils.loadMsInfo(serverDoc, msg.author.id);

				if(!items.hasOwnProperty(args[2])){ //eslint-disable-line no-prototype-builtins
					const embed = new Discord.MessageEmbed()
					.setColor(0x000000)
					.setDescription('That is not a valid item!');

					return msg.channel.send(embed);
				}
				if(!args[3]) args[3] = 1;

				if(userMS.protons >= items[args[2]].protons * args[3] && userMS.electrons >= items[args[2]].electrons * args[3] && userMS.darkMatter >= items[args[2]].darkMatter * args[3]){
					userMS.protons -= items[args[2]].protons;
					userMS.electrons -= items[args[2]].electrons;
					userMS.darkMatter -= items[args[2]].darkMatter;
					userMS.items.push(args[2]);

					serverDoc.markModified('ms');
					serverDoc.save().then(() => {
						const embed = new Discord.MessageEmbed()
						.setColor(0x000000)
						.setDescription(`
							Purchase completed!

							\t + **${args[3]}** ${args[2]}
							\t - **${items[args[2]].protons * args[3]}** Protons
							\t - **${items[args[2]].electrons * args[3]}** Electrons
							\t - **${items[args[2]].darkMatter * args[3]}** Dark Matter

							You now have:
							\t **${userMS.protons}** Protons
							\t **${userMS.electrons}** Electrons
							\t **${userMS.darkMatter}** Dark Matter
						`);

						return msg.channel.send(embed);
					});
				} else {
					const embed = new Discord.MessageEmbed()
					.setColor(0x000000)
					.setDescription('You do not have enough protons/electrons/dark matter to buy this item!');

					return msg.channel.send(embed);
				}
			} else if(args[1] === 'sell'){
				let userMS = await client.utils.loadMsInfo(serverDoc, msg.author.id);
				if(!args[2]){
					const embed = new Discord.MessageEmbed()
					.setColor(0x000000)
					.setDescription('Please enter the name of the item you wish to sell!');

					return msg.channel.send(embed);
				}

				if(!userMS.items.includes(args[2])){
					const embed = new Discord.MessageEmbed()
					.setColor(0x000000)
					.setDescription('You do not own this item!');

					return msg.channel.send(embed);
				}

				if(!args[3]) args[3] = 1;

				let protons = items[args[2]].protons * args[3] / 2;
				let electrons = items[args[2]].electrons * args[3] / 2;
				let darkMatter = items[args[2]].darkMatter * args[3] / 2;

				let removed = 0;
				for(let i=0; i < userMS.items.length; i++){
					if(userMS.items[i] === args[2] && removed <= args[3]){
						userMS.items.splice(i, 1);
						removed++;
					}
				}

				if(removed < args[3]){
					const embed = new Discord.MessageEmbed()
					.setColor(0x000000)
					.setDescription('You do not have that many of the specified item!');

					return msg.channel.send(embed);
				}
				userMS.protons += protons;
				userMS.electrons += electrons;
				userMS.darkMatter += darkMatter;
				
				serverDoc.markModified('ms');
				serverDoc.save().then(() => {
					const embed = new Discord.MessageEmbed()
					.setColor(0x000000)
					.setDescription(`
						Sell completed!

						\t - **${args[3]}** ${args[2]}
						\t + **${protons * args[3]}** Protons
						\t + **${electrons}** Electrons
						\t + **${darkMatter}** Dark Matter

						You now have:
						\t **${userMS.protons}** Protons
						\t **${userMS.electrons}** Electrons
						\t **${userMS.darkMatter}** Dark Matter
					`);

					return msg.channel.send(embed);
				});
			} else {
				let itemStr = ""
				for(let item in items){
					itemStr = itemStr + `**${item}**: *${items[item].protons} Protons, ${items[item].electrons} Electrons, ${items[item].darkMatter} Dark Matter* \n`
				}
				const embed = new Discord.MessageEmbed()
				.setColor(0x000000)
				.setTitle(`Singularity Shop`)
				.setDescription(`
					${itemStr}
					*Use \`${serverDoc.prefix}singularity shop buy <item_name> <!quantity>\` to buy an item!*
				`)
				.setFooter(`Singularity Shop requested by ${msg.author.tag}`, msg.author.displayAvatarURL());

				return msg.channel.send(embed);
			}
		} else {
			let user = msg.mentions.users.first() ? msg.mentions.users.first() : msg.author;
			console.log(user.id);
			let userMS = await client.utils.loadMsInfo(serverDoc, user.id);
			
			let itemStr = '\n'
			for(let item of userMS.items){
				itemStr = itemStr + `- **${item}** \n `;
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