export default (client, ev, userID, guildID, data) => {
	ev.code = new Promise((resolve) => {
		client.guilds.cache
			.get(guildID)
			?.members.fetch(userID)
			.then((member) => {
				if (!member) return resolve(2);
				const cleanData = {};
				for (const prop in data) {
					if (data[prop]) cleanData[prop] = data[prop];
				}
				client.utils.updateServer(client, guildID, cleanData);
				return resolve(0);
			});
	});
};
