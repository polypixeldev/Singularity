module.exports = (client, ev, userID, guildID, nickname) => {
	ev.code = new Promise((resolve) => {
		client.guilds.cache
			.get(guildID)
			?.members.fetch(userID)
			.then((member) => {
				if (!member) return resolve(2);
				member.guild.me.setNickname(nickname, `Web API - User ${userID}`);
				return resolve(0);
			});
	});
};
