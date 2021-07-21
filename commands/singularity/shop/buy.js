module.exports = async (client, Discord, msg, args, serverDoc, items) => {
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
}