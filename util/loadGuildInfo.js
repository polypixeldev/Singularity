module.exports = {
	name: 'loadGuildInfo',
	async execute(client, guildResolvable){
		let guild = client.guilds.resolve(guildResolvable);
		let serverDoc;
		await client.serverModel.findOne({guildID: guild.id}, async(err, server) => {
			if(err !== null && err){
				return err;
			} else if(server === null){
				const newServer = new client.serverModel({
					guildID: guild.id,
					prefix: '.',
					welcomeMessage: '{member-mention} has joined the server!',
					welcomeChannelName: 'welcome',
					leaveChannelName: 'welcome',
					leaveMessage: '{member-tag} has left the server :(',
					reactionroles: [],
					ms: [client.msSchema]
				});

				serverDoc = newServer;
				console.log('set');
				await newServer.save(function(err){
					if(err !== null && err){
						return err;
					}
				});
			} else {
				serverDoc = server;
			}
		});
		return serverDoc;
	}
}