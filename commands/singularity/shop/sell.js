module.exports = async (client, Discord, msg, args, serverDoc, items) => {
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
}