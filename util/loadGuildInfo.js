module.exports = (client, guildResolvable) => {
	return new Promise((resolve) => {
		let guild = client.guilds.resolve(guildResolvable);
		client.serverModel.findOne({guildID: guild.id}).exec().then(serverDoc => {
			if(serverDoc === null){
				const newServer = new client.serverModel({
					guildID: guild.id,
					prefix: '.',
					welcomeMessage: '{member-mention} has joined the server!',
					welcomeChannelID: 'none',
					leaveChannelID: 'none',
					leaveMessage: '{member-tag} has left the server :(',
					reactionRoles: [],
					ms: [client.msSchema]
				});
				resolve(newServer);
			} else {
				resolve(serverDoc);
			}
		});	
	});
}
