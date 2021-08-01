module.exports = async (client, Discord, msg, args, serverDoc, items, powerUps) => {
	let userMS = await client.utils.loadUserInfo(client, serverDoc, msg.author.id);
	let selectedItem;

	for(let item in items){
		if(items[item].name === args[2]){
			selectedItem = ['item', items[item]];
		}
	}

	for(let powerup in powerUps){
		if(powerUps[powerup].name === args[2]){
			selectedItem = ['powerup', powerUps[powerup]];
		}
	}

	if(!selectedItem){ //eslint-disable-line no-prototype-builtins
		const embed = new Discord.MessageEmbed()
		.setColor(0x000000)
		.setDescription('That is not a valid item!');

		return msg.channel.send(embed);
	}

	if(!args[3]) args[3] = 1;

	if(userMS.protons >= selectedItem[1].protons * args[3] && userMS.electrons >= selectedItem[1].electrons * args[3] && userMS.darkMatter >= selectedItem[1].darkMatter * args[3]){
		userMS.protons -= selectedItem[1].protons;
		userMS.electrons -= selectedItem[1].electrons;
		userMS.darkMatter -= selectedItem[1].darkMatter;
		if(selectedItem[0] === 'item'){
			userMS.items.push(args[2]);
		} else {
			userMS.powerUps.push(args[2]);
		}

		client.utils.userQueue(client, serverDoc, userMS).then(() => {
			const embed = new Discord.MessageEmbed()
			.setColor(0x000000)
			.setDescription(`
				Purchase completed!

				\t + **${args[3]}** ${args[2]}
				\t - **${selectedItem[1].protons * args[3]}** Protons
				\t - **${selectedItem[1].electrons * args[3]}** Electrons
				\t - **${selectedItem[1].darkMatter * args[3]}** Dark Matter

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