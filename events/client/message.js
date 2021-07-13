const fs = require('fs');

const cooldowns = {

}

const levelArr = [200, 500, 1000, 2000, 5000, 9000, 14000, 20000, 28000, 40000];

//eslint-disable-next-line
let cooldownInterval = setInterval(() => {
  for(let person in cooldowns){
    if(cooldowns[person] > 0) cooldowns[person]--;
  }
}, 1000);

module.exports = async (Discord, client, msg) => {
	if(msg.author.bot) return;
	if(msg.channel.type === 'dm') return;
	console.log(cooldowns);
	let userMS;
	let serverDoc
	await client.utils.loadGuildInfo(client, msg.guild).then(async server => {
		serverDoc = server
		userMS = await client.utils.loadMsInfo(server, msg.author.id, client);
	})
	if(serverDoc === 'err') return msg.channel.send(serverDoc);
    const prefix = serverDoc.prefix;

	if(msg.channel.type ==='dm'){
		if(msg.author.bot){
			return;
		}
		const args = msg.content.split(/ +/);
		const command = args.shift().toLowerCase();
		const poly = client.users.cache.get('722092754510807133');
		if(command === 'bug'){
			poly.send(`Bug from \`${msg.author.tag}\`: ${args.join(' ')}`);
			return msg.channel.send('The bug has been reported! Thank you for helping to improve Singularity!');
		} else if(command === 'suggestion'){
			poly.send(`Suggestion from \`${msg.author.tag}\`: ${args.join(' ')}`);
			return msg.channel.send('Your suggestion has been sent! Thank you for helping to improve Singularity!');
		} else {
			return msg.channel.send('Woops! Singularity doesn\'t respond to DM commands. Try sending `!help` in a server!');
		}
	}
	
	if(!msg.author.bot){
		if(!cooldowns[msg.author.id]){
			cooldowns[msg.author.id] = 0;
		}
	
		const prevExp = userMS.atoms;
		if(cooldowns[msg.author.id] === 0){
			console.log('exp');
			let addProton = Math.random() * 5;
			let addElectron = Math.random() * 2;
			userMS.protons += Math.floor(10 + addProton);
			userMS.electrons += Math.floor(10 + addElectron);
			userMS.lifeExp += Math.floor(20 + addProton + (addElectron * 2.5));
			cooldowns[msg.author.id] = 60;
		}
		let index = 1;
		for(let value of levelArr){
			if(prevExp < value && userMS.lifeAtoms >= value){
				msg.channel.send(`Level up! Your Singularity is now level **${index}**!`);
			}
			index++;
		}
	
		serverDoc.markModified('ms');
		await serverDoc.save();
		console.log('saved');
	}

    if(!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));
	if(!command) return;
	let errors = JSON.parse(fs.readFileSync('./errors.json'));
	for(let cmd of errors){
		if(cmd.command === command.name){
			const embed = new Discord.MessageEmbed()
			.setColor(0xFF0000)
			.setDescription(`This command is currently in Maintenance Mode due to an error. The command will be made available once the error is resolved. Thank you for your patience.`);

			return msg.channel.send(embed);
		}
	}
	
	try {
		command.execute(client, Discord, msg, args, serverDoc);
	} catch(error){
		let stack = error.stack.split('\n');
		stack.shift();
		stack.pop();

		errors.push({
			command: command.name,
			errorMsg: error.message,
			stack: stack
		});
		fs.writeFileSync('./errors.json', JSON.stringify(errors, null, 2));

		const embed = new Discord.MessageEmbed()
		.setColor(0xFF0000)
		.setDescription(`There was an error executing this command. Command ${command.name} has gone into Maintenance Mode until the issue is resolved. Thank you for your patience.`);

		return msg.channel.send(embed);
	}
}