module.exports = async (client, Discord, msg, args, serverDoc) => {
	let userMS = await client.utils.loadMsInfo(serverDoc, msg.author.id);
			let limit = -1;
			let remaining = {
				protons: userMS.protons,
				electrons: userMS.electrons
			}
			remaining.protons -= userMS.singularity.size * 25;
			remaining.electrons -= userMS.singularity.size * 7;
			do {
				remaining.protons -= 1000;
				remaining.electrons -= 250;
				limit++;
			} while(remaining.protons > 0 && remaining.electrons > 0)

			const embed = new Discord.MessageEmbed()
			.setColor(0x000000)
			.setDescription(`
				**Current Singularity Size:** *${userMS.singularity.size}*
				**Current Protons:** *${userMS.protons}*
				**Current Electrons:** *${userMS.electrons}*

				**Amount of Protons Per Additional Upgrade:** *1000*
				**Amount of Electrons Per Additional Upgrade:** *250*
				**Current Size Fee:** *${userMS.singularity.size * 25} Protons & ${userMS.singularity.size * 7} Electons*
				**Amount Needed for 1 Upgrade:** *${5000 + userMS.singularity.size * 25} Protons & ${1000 + userMS.singularity.size * 7} Electrons*

				**Maximum Upgrades Available: ** *${limit}*

				*Respond with the desired number of upgrades within 30 seconds, or respond with 0 to abort*
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
					userMS.electrons -= num * 250;
					userMS.protons -= num * 1000;
					userMS.electrons -= userMS.singularity.size * 7;
					userMS.protons -= userMS.singularity.size * 25;
					userMS.singularity.size += Math.floor((Math.random() * 9) + 1);
					serverDoc.markModified('ms');
					client.utils.saveQueue(client, serverDoc).then(() => {
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
}