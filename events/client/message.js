const cooldowns = {

}

const levelArr = [200, 500, 1000, 2000, 5000, 9000, 14000, 20000, 28000, 40000];

//eslint-disable-next-line
let cooldownInterval = setInterval(() => {
  for(let person in cooldowns){
    if(cooldowns[person] > 0) cooldowns[person]--;
  }
}, 1000);

function splitCommandLine( commandLine ) {
    var doubleDoubleQuote = '<DDQ>' ;
    while( commandLine.indexOf( doubleDoubleQuote ) > -1 ) doubleDoubleQuote += '@' ;
    var noDoubleDoubleQuotes = commandLine.replace( /""/g, doubleDoubleQuote ) ;
    var spaceMarker = '<SP>' ;
    while( commandLine.indexOf( spaceMarker ) > -1 ) spaceMarker += '@' ;
    var noSpacesInQuotes = noDoubleDoubleQuotes.replace( /"([^"]*)"?/g, ( fullMatch, capture ) => {
        return capture.replace( / /g, spaceMarker )
                      .replace( RegExp( doubleDoubleQuote, 'g' ), '"' ) ;
    }) ;
    var mangledParamArray = noSpacesInQuotes.split( / +/ ) ;
    var paramArray = mangledParamArray.map( ( mangledParam ) => {
        return mangledParam.replace( RegExp( spaceMarker,       'g' ), ' ' )
                           .replace( RegExp( doubleDoubleQuote, 'g' ), ''  ) ;
    });
    return paramArray ;
}

module.exports = async (Discord, client, msg) => {
	if(msg.author.bot) return;
	if(msg.channel.type === 'dm') return;
	let userMS;
	let serverDoc
	await client.utils.loadGuildInfo(client, msg.guild).then(async server => {
		serverDoc = server
		userMS = await client.utils.loadUserInfo(client, server, msg.author.id);
	})
	if(serverDoc === 'err') return;
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
			let protonBoosts = userMS.active.filter(powerup => powerup.name === '2x Proton Boost').length
			let electronBoosts = userMS.active.filter(powerup => powerup.name === '2x Electron Boost').length
			let addProton = Math.floor(5 + (Math.random() * 5));
			let addElectron = Math.floor(5 + Math.random());
			userMS.protons += addProton * (protonBoosts * 2 === 0 ? 1 : protonBoosts * 2);
			userMS.electrons += addElectron * (electronBoosts * 2 === 0 ? 1 : electronBoosts * 2);
			userMS.lifeExp += Math.floor(10 + addProton + (addElectron * 2.5));
			cooldowns[msg.author.id] = 60;
		}
		let index = 1;
		for(let value of levelArr){
			if(prevExp < value && userMS.lifeAtoms >= value){
				msg.channel.send(`Level up! Your Singularity is now level **${index}**!`);
			}
			index++;
		}

		await client.utils.userQueue(client, serverDoc, userMS)
	}

    if(!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = splitCommandLine(msg.content.slice(prefix.length));
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));
	if(!command) return;
	
	command.execute(client, Discord, msg, args, serverDoc);
}