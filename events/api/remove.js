const Discord = require("discord.js");

module.exports = (client, ev, userID, guildID) => {
	ev.code = new Promise((resolve) => {
		client.guilds.cache
			.get(guildID)
			?.members.fetch(userID)
			.then((member) => {
				if (!member) return resolve(2);

				let currentDate = new Date(Date.now());

				const embed = new Discord.MessageEmbed()
					.setColor(0x000000)
					.setTitle("Goodbye")
					.setDescription(
						`
					I'm sorry that Singularity was not fit for your server. If possible, please fill out this survey:
					https://forms.gle/GgMKrsCHhe3fBN879

					In case you want to invite Singularity again, just use the following link:
					https://discord.com/oauth2/authorize?client_id=835256019336036423&permissions=261993005047&redirect_uri=https%3A%2F%2Fsingularitybot.glitch.me%2Flogin&scope=applications.commands%20bot

					***Server data will be lost if Singularity is not re-invited within 5 minutes.***

					*Sincerely,
					The Singularity Team*
				`
					)
					.setFooter(
						`Singularity was kicked by User ID ${userID} through the Web API • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`
					);

				client.guilds.cache
					.get(guildID)
					.systemChannel.send({ embeds: [embed] })
					.then(() => {
						client.guilds.cache.get(guildID).leave();

						setTimeout(async () => {
							if (
								await client.guilds.cache.find((guild) => guild.id === guildID)
							) {
								client.serverModel.deleteOne({ guildID: guildID });
							}
						}, 300000);
					});

				return resolve(0);
			});
	});
};
