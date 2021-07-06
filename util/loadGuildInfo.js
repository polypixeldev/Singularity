module.exports = async (client, guildResolvable) => {
		let guild = client.guilds.resolve(guildResolvable);
		let serverDoc;
		await client.serverModel.findOne({guildID: guild.id}, async(err, server) => {
			if(err !== null && err){
				console.error(err);
				return err;
			} else if(server === null){
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

				serverDoc = newServer;
				console.log('set');
				await newServer.save(client.utils.saveCallback);
			} else {
				serverDoc = server;
			}
		});
		return serverDoc;
	}
