const prettyMS = require('pretty-ms');

module.exports = async (client, Discord, msg, args, serverDoc, items, powerUps) => {
	let userMS = await client.utils.loadMsInfo(serverDoc, msg.author.id);
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

		return msg.channel.send(embed);
	}

	if(!userMS.powerUps.includes(args[1])){
		const embed = new Discord.MessageEmbed()
		.setColor(0x000000)
		.setDescription('You do not own this item!');

		return msg.channel.send(embed);
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

	setTimeout(async () => {
		let newServerDoc = await client.utils.loadGuildInfo(client, msg.guild);
		let newUserMS = await client.utils.loadMsInfo(newServerDoc, msg.author.id);

		for(let i=0; i < newUserMS.active.length; i++){
			if(newUserMS.active[i].name === args[1]){
				newUserMS.active.splice(i, 1);
				break;
			}
		}

		newServerDoc.markModified('ms');
		newServerDoc.save();
	}, selectedItem.time);

	serverDoc.markModified('ms');
	serverDoc.save().then(() => {
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

		return msg.channel.send(embed);
	})
}