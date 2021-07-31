module.exports = async (client, Discord, msg, args, serverDoc) => {
	let user = msg.mentions.users.first();

	if(!user){
		const embed = new Discord.MessageEmbed()
		.setColor(0x000000)
		.setDescription('You did not mention a user!')

		return msg.channel.send(embed);
	}

	let type = args[3] === 'protons' || args[3] === 'electrons' || args[3] === 'darkMatter';
	if(!type){
		const embed = new Discord.MessageEmbed()
		.setColor(0x000000)
		.setDescription('You did not specify a valid type! (Must be `protons`, `electrons`, or `darkMatter`)');

		return msg.channel.send(embed);
	}
	if(!args[4]){
		const embed = new Discord.MessageEmbed()
		.setColor(0x000000)
		.setDescription('You did not specify a value!');

		return msg.channel.send(embed);
	}

	let mode = args[4].startsWith('+') ? 'add' : args[4].startsWith('-') ? 'subtract' : 'set';

	if(isNaN(args[4].slice(1))){
		const embed = new Discord.MessageEmbed()
		.setColor(0x000000)
		.setDescription('The value provided is invalid!')

		return msg.channel.send(embed);
	}

	let userMS = await client.utils.loadMsInfo(serverDoc, user.id);

	if(mode === 'add'){
		userMS[args[3]] += args[4].slice(1)
	} else if(mode === 'subtract'){
		userMS[args[3]] -= args[4].slice(1);
	} else {
		userMS[args[3]] = args[4]
	}

	serverDoc.markModified('ms');
	client.utils.saveQueue(client, serverDoc)
	.then(() => {
		const embed = new Discord.MessageEmbed()
		.setColor(0x000000)
		.setDescription(`
			Set Successful
		`);

		return msg.channel.send(embed);
	})
}