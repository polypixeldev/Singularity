import Discord from "discord.js";

import BaseEmbed from "../../../util/BaseEmbed.js";

import type Command from "../../../interfaces/client/Command.js";

export default {
	name: "kick",
	description: "Kick Singularity from the server",
	type: Discord.ApplicationCommandType.ChatInput,
	category: "mod",
	options: [],
	args: [],
	aliases: [],
	example: "settings bot kick",
	async slashExecute(client, interaction) {
		await interaction.deferReply({ ephemeral: true });

		if (!interaction.channel) {
			return;
		}

		const embed = new Discord.EmbedBuilder()
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
				const message = collection.first();

				if (!message) {
					return;
				}

				if (message.content === "Y") {
					const embed = new BaseEmbed("Singularity Kick", interaction.user)
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
						if (!interaction.guild) {
							return;
						}

						interaction.guild.leave();

						setTimeout(async () => {
							if (!interaction.guild) {
								return;
							}

							if (
								await client.guilds.cache.find(
									(guild) => guild.id === interaction.guild?.id
								)
							) {
								client.serverModel.deleteOne({ guildID: interaction.guild.id });
							}
						}, 300000);
					});
				} else {
					const embed = new Discord.EmbedBuilder()
						.setColor(0x000000)
						.setDescription("Kick Aborted");

					return interaction.editReply({ embeds: [embed] });
				}
			})
			.catch(() => {
				const embed = new Discord.EmbedBuilder()
					.setColor(0x000000)
					.setDescription("You did not respond with a valid answer in time!");

				return interaction.editReply({ embeds: [embed] });
			});
	},
} as Command;
