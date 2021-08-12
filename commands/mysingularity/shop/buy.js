module.exports = {
	name: 'buy',
	description: 'Buy an item from the Singularity Shop!',
	type: 'ms',
	options: [{
		name: 'item',
		description: 'The name of the item you want to buy',
		type: 'STRING',
		required: true
	}, {
		name: 'quantity',
		description: 'How many of the item you want to buy - defaults to 1',
		type: 'INTEGER',
		required: false
	}],
	args: [],
	aliases: [],
	example: 'ms buy trophy',
	async execute(client, Discord, msg, args, serverDoc, items, powerUps){
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

			return msg.channel.send({embeds: [embed]});
		}

		if(!args[3]) args[3] = 1;

		if(userMS.protons >= selectedItem[1].protons * args[3] && userMS.electrons >= selectedItem[1].electrons * args[3] && userMS.darkMatter >= selectedItem[1].darkMatter * args[3]){
			userMS.protons -= selectedItem[1].protons * args[3];
			userMS.electrons -= selectedItem[1].electrons * args[3];
			userMS.darkMatter -= selectedItem[1].darkMatter * args[3];
			if(selectedItem[0] === 'item'){
				userMS.items.push(args[2]);
			} else {
				userMS.powerUps.push(args[2]);
			}

			client.utils.updateUser(client, serverDoc.guildID, userMS.userID, userMS).then(() => {
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

				return msg.channel.send({embeds: [embed]});
			});
		} else {
			const embed = new Discord.MessageEmbed()
			.setColor(0x000000)
			.setDescription('You do not have enough protons/electrons/dark matter to buy this item!');

			return msg.channel.send({embeds: [embed]});
		}
	},
	async slashExecute(client, Discord, interaction, serverDoc, items, powerUps){
		let userMS = await client.utils.loadUserInfo(client, serverDoc, interaction.user.id);
		let selectedItem;

		for(let item in items){
			if(items[item].name === interaction.options.get('item').value){
				selectedItem = ['item', items[item]];
			}
		}

		for(let powerup in powerUps){
			if(powerUps[powerup].name === interaction.options.get('item').value){
				selectedItem = ['powerup', powerUps[powerup]];
			}
		}

		if(!selectedItem){ //eslint-disable-line no-prototype-builtins
			const embed = new Discord.MessageEmbed()
			.setColor(0x000000)
			.setDescription('That is not a valid item!');

			return interaction.editReply({embeds: [embed]});
		}

		let quantity = interaction.options.get('quantity')?.value
		if(!quantity) quantity = 1;

		if(userMS.protons >= selectedItem[1].protons * quantity && userMS.electrons >= selectedItem[1].electrons * quantity && userMS.darkMatter >= selectedItem[1].darkMatter * quantity){
			userMS.protons -= selectedItem[1].protons * quantity;
			userMS.electrons -= selectedItem[1].electrons * quantity;
			userMS.darkMatter -= selectedItem[1].darkMatter * quantity;
			if(selectedItem[0] === 'item'){
				userMS.items.push(interaction.options.get('item').value);
			} else {
				userMS.powerUps.push(interaction.options.get('item').value);
			}

			client.utils.updateUser(client, serverDoc.guildID, userMS.userID, userMS).then(() => {
				const embed = new Discord.MessageEmbed()
				.setColor(0x000000)
				.setDescription(`
					Purchase completed!

					\t + **${quantity}** ${interaction.options.get('item').value}
					\t - **${selectedItem[1].protons * quantity}** Protons
					\t - **${selectedItem[1].electrons * quantity}** Electrons
					\t - **${selectedItem[1].darkMatter * quantity}** Dark Matter

					You now have:
					\t **${userMS.protons}** Protons
					\t **${userMS.electrons}** Electrons
					\t **${userMS.darkMatter}** Dark Matter
				`);

				return interaction.editReply({embeds: [embed]});
			});
		} else {
			let missingArr = [userMS.protons - (selectedItem[1].protons * quantity), userMS.electrons - (selectedItem[1].electrons * quantity), userMS.darkMatter - (selectedItem[1].darkMatter * quantity)]

			missingArr = missingArr.map(type => {
				if(type > 0){
					type = 0
				} else {
					console.log(type)
					type = Math.abs(type)
					console.log(type)
				}

				return type
			})

			const embed = new Discord.MessageEmbed()
			.setColor(0x000000)
			.setDescription(`
				You do not have enough resources needed to buy this item!

				Missing:
				 - **${missingArr[0]}** Protons
				 - **${missingArr[1]}** Electrons
				 - **${missingArr[2]}** Dark Matter
			`);

			return interaction.editReply({embeds: [embed]});
		}
	}
}