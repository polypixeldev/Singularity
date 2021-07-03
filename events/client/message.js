const cooldowns = {

}

const levelArr = [50, 80, 800, 1250, 1750, 2500, 4000, 7500, 15000, 30000];

//eslint-disable-next-line
let cooldownInterval = setInterval(() => {
  for(let person in cooldowns){
    if(cooldowns[person] > 0) cooldowns[person]--;
  }
}, 30000);

module.exports = async (Discord, client, serverModel, msg) => {
	if(msg.author.bot) return;
	const serverDoc = await client.utils.get('loadGuildInfo').execute(client, msg.guild);
	const userMS = await client.utils.get('loadMsInfo').execute(serverDoc, msg.author.id, client);
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
			userMS.atoms += Math.floor(10 + (Math.random() * 10));
			cooldowns[msg.author.id] = 60;
		}
		let index = 1;
		for(let value of levelArr){
			if(prevExp < value && userMS.atoms >= value){
				msg.channel.send(`Level up! Your Singularity is now level **${index}**!`);
			}
			index++;
		}
	
		serverDoc.markModified('ms');
		await serverDoc.save(client.utils.get('saveCallback'));
	}

    if(!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    if(command) command.execute(client, Discord, msg, args, serverModel, prefix);
}