const prettyMS = require('pretty-ms');

module.exports = {
	name: 'use',
	description: 'Use a power-up!',
	type: 'ms',
	options: [{
		name: 'powerup',
		description: 'The name of the powerup you want to use',
		type: 'STRING',
		required: true
	}],
	args: [],
	aliases: [],
	example: 'ms use "2x Proton Boost"',
	async execute(client, Discord, msg, args, serverDoc, items, powerUps){
		let userMS = await client.utils.loadUserInfo(client, serverDoc, msg.author.id);
		let selectedItem;

		for(let powerup in powerUps){
			if(powerUps[powerup].name === args[1]){
				selectedItem = powerUps[powerup];
			}
		}

		if(!selectedItem){
			const embed = new Discord.MessageEmbed()
			.setColor(0x000000)
			.setDescription('Please enter the name of the powerup you wish to use!');

			return msg.channel.send({embeds: [embed]});
		}

		if(!userMS.powerUps.includes(args[1])){
			const embed = new Discord.MessageEmbed()
			.setColor(0x000000)
			.setDescription('You do not own this item!');

			return msg.channel.send({embeds: [embed]});
		}

		userMS.active.push({
			name: args[1],
			time: selectedItem.time,
			start: Date.now()
		});

		for(let i=0; i < userMS.powerUps.length; i++){
			if(userMS.powerUps[i] === args[1]){
				userMS.powerUps.splice(i, 1);
				break;
			}
		}

		client.utils.updateUser(client, serverDoc.guildID, userMS.userID, userMS).then(() => {

			setTimeout(async () => {
				let newServerDoc = await client.utils.loadGuildInfo(client, msg.guild);
				let newUserMS = await client.utils.loadUserInfo(client, newServerDoc, msg.author.id);
		
				for(let i=0; i < newUserMS.active.length; i++){
					if(newUserMS.active[i].name === args[1]){
						newUserMS.active.splice(i, 1);
						break;
					}
				}

				client.utils.updateUser(client, newServerDoc.guildID, newUserMS.userID, newUserMS)
			}, selectedItem.time);

			let itemList = "";
			for(let powerup of userMS.active){
				itemList = itemList + ` - **${powerup.name}** - ${prettyMS(powerup.time - (Date.now() - powerup.start))} \n`
			}

			const embed = new Discord.MessageEmbed()
			.setColor(0x000000)
			.setDescription(`
				***Power-Up Activated!***
				**${args[1]}** *is now active, and will last for:* **${prettyMS(selectedItem.time)}**!

				**Current Active Power-Ups:**
				${itemList}
			`);

			return msg.channel.send({embeds: [embed]});
		})
	},
	async slashExecute(client, Discord, interaction, serverDoc, items, powerUps){
		let userMS = await client.utils.loadUserInfo(client, serverDoc, interaction.user.id);
		let selectedItem;

		for(let powerup in powerUps){
			if(powerUps[powerup].name === interaction.options.get('powerup').value){
				selectedItem = powerUps[powerup];
			}
		}

		if(!selectedItem){
			const embed = new Discord.MessageEmbed()
			.setColor(0x000000)
			.setDescription('Please enter the name of the powerup you wish to use!');

			return interaction.editReply({embeds: [embed]});
		}

		if(!userMS.powerUps.includes(interaction.options.get('powerup').value)){
			const embed = new Discord.MessageEmbed()
			.setColor(0x000000)
			.setDescription('You do not own this item!');

			return interaction.editReply({embeds: [embed]});
		}

		userMS.active.push({
			name: interaction.options.get('powerup').value,
			time: selectedItem.time,
			start: Date.now()
		});

		for(let i=0; i < userMS.powerUps.length; i++){
			if(userMS.powerUps[i] === interaction.options.get('powerup').value){
				userMS.powerUps.splice(i, 1);
				break;
			}
		}

		client.utils.updateUser(client, serverDoc.guildID, userMS.userID, userMS).then(() => {

			setTimeout(async () => {
				let newServerDoc = await client.utils.loadGuildInfo(client, interaction.guild);
				let newUserMS = await client.utils.loadUserInfo(client, newServerDoc, interaction.user.id);
		
				for(let i=0; i < newUserMS.active.length; i++){
					if(newUserMS.active[i].name === interaction.options.get('powerup.value')){
						newUserMS.active.splice(i, 1);
						break;
					}
				}

				client.utils.updateUser(client, newServerDoc.guildID, newUserMS.userID, newUserMS)
			}, selectedItem.time);

			let itemList = "";
			for(let powerup of userMS.active){
				itemList = itemList + ` - **${powerup.name}** - ${prettyMS(powerup.time - (Date.now() - powerup.start))} \n`
			}

			const embed = new Discord.MessageEmbed()
			.setColor(0x000000)
			.setDescription(`
				***Power-Up Activated!***
				**${interaction.options.get('powerup').value}** *is now active, and will last for:* **${prettyMS(selectedItem.time)}**!

				**Current Active Power-Ups:**
				${itemList}
			`);

			return interaction.editReply({embeds: [embed]});
		})
	}
}