import Discord from "discord.js";

import type Command from "../interfaces/client/Command.js";

export default {
	name: "ping",
	description: "Responds with the bot's latency and the API latency",
	defaultPermission: true,
	options: [],
	type: Discord.ApplicationCommandType.ChatInput,
	category: "general",
	args: [],
	aliases: [],
	example: "ping",
	async slashExecute(client, interaction) {
		await interaction.deferReply({ ephemeral: true });
		let latestEmbed = new Discord.EmbedBuilder()
			.setDescription(
				`🏓 Latency is ${
					Date.now() - interaction.createdTimestamp
				}ms. API Latency is ${Math.round(client.ws.ping)}ms`,
			)
			.setColor(0x000000);

		const row =
			new Discord.ActionRowBuilder<Discord.ButtonBuilder>().addComponents(
				new Discord.ButtonBuilder()
					.setLabel("Retest")
					.setStyle(Discord.ButtonStyle.Primary)
					.setCustomId("retest"),
			);

		interaction
			.editReply({
				embeds: [latestEmbed],
				components: [row],
			})
			.then((reply) => {
				if (!(reply instanceof Discord.Message)) {
					return;
				}

				const collector = reply.createMessageComponentCollector({
					componentType: Discord.ComponentType.Button,
					time: 300000,
					dispose: true,
				});

				collector.on("collect", async (press) => {
					if (press.user.id !== interaction.user.id) {
						const embed = new Discord.EmbedBuilder()
							.setColor(0x000000)
							.setDescription("You cannot perform this action!");

						press.reply({ embeds: [embed] });
					} else {
						await press.deferUpdate();

						const embed = new Discord.EmbedBuilder()
							.setDescription(
								`🏓 Latency is ${
									Date.now() - press.createdTimestamp
								}ms. API Latency is ${Math.round(client.ws.ping)}ms`,
							)
							.setColor(0x000000);

						latestEmbed = embed;

						press.editReply({ embeds: [embed] });
					}
				});

				collector.on("end", () => {
					interaction.editReply({
						components: [
							{
								type: Discord.ComponentType.ActionRow,
								components: [
									{
										type: Discord.ComponentType.Button,
										label: "Retest",
										style: Discord.ButtonStyle.Primary,
										customId: "retest",
										disabled: true,
									},
								],
							},
						],
						embeds: [latestEmbed],
					});
				});
			});
	},
} as Command;
