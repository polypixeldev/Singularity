module.exports = (client, guildResolvable) => {
	return new Promise((resolve) => {
		let guild = client.guilds.resolve(guildResolvable);
		client.serverModel.findOne({guildID: guild.id}).exec().then(serverDoc => {
			console.log('h');
			if(serverDoc === null){
				console.log('gSetting...');
				const newServer = new client.serverModel({
					guildID: guild.id,
					prefix: '.',
					welcomeMessage: '{member-mention} has joined the server!',
					welcomeChannelName: 'welcome',
					leaveChannelName: 'welcome',
					leaveMessage: '{member-tag} has left the server :(',
					reactionRoles: [],
					ms: [client.msSchema]
				});
				resolve(newServer);
				console.log('gSet');
			} else {
				resolve(serverDoc);
			}
		
		//return serverDoc;
		
		});	
	});
}
