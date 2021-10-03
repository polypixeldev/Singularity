module.exports = {
	name: "kick",
	description: "Kick Singularity from the server",
	type: "mod",
	options: [],
	args: [],
	aliases: [],
	example: "settings bot kick",
	execute(client, Discord, msg) {
		const embed = new Discord.MessageEmbed()
			.setColor(0x000000)
			.setDescription("Are you sure you want to kick Singularity? (Y/N)");

		msg.channel.send({ embeds: [embed] });
		msg.channel
			.awaitMessages({
				filter: (message) =>
					message.author.id === msg.author.id &&
					(message.content === "Y" || message.content === "N"),
				max: 1,
				time: 30000,
				errors: ["time"],
			})
			.then((collection) => {
				let message = collection.first();
				if (message.content === "Y") {
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
							`Singularity was kicked by ${
								msg.author.tag
							}  • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`,
							msg.author.displayAvatarURL()
						);

					msg.channel.send({ embeds: [embed] }).then(() => {
						msg.guild.leave();

						setTimeout(async () => {
							if (
								await client.guilds.cache.find(
									(guild) => guild.id === msg.guild.id
								)
							) {
								client.serverModel.deleteOne({ guildID: msg.guild.id });
							}
						}, 300000);
					});
				} else {
					const embed = new Discord.MessageEmbed()
						.setColor(0x000000)
						.setDescription("Kick Aborted");

					return msg.channel.send({ embeds: [embed] });
				}
			})
			.catch(() => {
				const embed = new Discord.MessageEmbed()
					.setColor(0x000000)
					.setDescription("You did not respond with a valid answer in time!");

				return msg.channel.send({ embeds: [embed] });
			});
	},
	async slashExecute(client, Discord, interaction) {
		await interaction.deferReply({ ephemeral: true });
		const embed = new Discord.MessageEmbed()
			.setColor(0x000000)
			.setDescription("Are you sure you want to kick Singularity? (Y/N)");

		interaction.editReply({ embeds: [embed] });
		interaction.channel
			.awaitMessages({
				filter: (message) =>
					message.author.id === interaction.user.id &&
					(message.content === "Y" || message.content === "N"),
				max: 1,
				time: 30000,
				errors: ["time"],
			})
			.then((collection) => {
				let message = collection.first();
				if (message.content === "Y") {
					const embed = new client.utils.BaseEmbed(
						"Singularity Kick",
						interaction.user
					)
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
						);

					interaction.editReply({ embeds: [embed] }).then(() => {
						interaction.guild.leave();

						setTimeout(async () => {
							if (
								await client.guilds.cache.find(
									(guild) => guild.id === interaction.guild.id
								)
							) {
								client.serverModel.deleteOne({ guildID: interaction.guild.id });
							}
						}, 300000);
					});
				} else {
					const embed = new Discord.MessageEmbed()
						.setColor(0x000000)
						.setDescription("Kick Aborted");

					return interaction.editReply({ embeds: [embed] });
				}
			})
			.catch(() => {
				const embed = new Discord.MessageEmbed()
					.setColor(0x000000)
					.setDescription("You did not respond with a valid answer in time!");

				return interaction.editReply({ embeds: [embed] });
			});
	},
};
