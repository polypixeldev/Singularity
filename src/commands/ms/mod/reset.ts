import Discord from "discord.js";

import loadUserInfo from "../../../util/loadUserInfo.js";
import updateServer from "../../../util/updateServer.js";

import type Command from "../../../interfaces/client/Command.js";

export default {
	name: "reset",
	description: "Reset a user's or the entire server's My Singularity data",
	options: [
		{
			name: "user",
			description:
				"The user you want to reset - pick Singularity (this bot) to reset the entire server",
			type: "USER",
			required: true,
		},
	],
	type: "ms",
	example: "ms mod reset @user",
	async slashExecute(client, interaction, serverDoc) {
		await interaction.deferReply({ ephemeral: true });
		const user = interaction.options.get("user")?.user;

		if (!user || !(interaction.member instanceof Discord.GuildMember)) {
			return;
		}

		if (!interaction.member.permissions.has("ADMINISTRATOR")) {
			const embed = new Discord.MessageEmbed()
				.setColor(0x000000)
				.setDescription(
					"You do not have permission to execute My Singularity moderation commands!"
				);

			return interaction.editReply({ embeds: [embed] });
		}

		const confirmEmbed = new Discord.MessageEmbed()
			.setColor(0x000000)
			.setDescription(
				`Are you sure you want to reset \`${
					user.id === process.env.CLIENT_ID ? "GLOBAL" : user.tag
				}\`'s My Singularity data? This will wipe **everything**, including Lifetime Experience. `
			);

		interaction
			.editReply({
				embeds: [confirmEmbed],
				components: [
					{
						type: "ACTION_ROW",
						components: [
							{
								label: "Yes",
								type: "BUTTON",
								customId: "yes",
								style: 3,
							},
							{
								label: "No",
								type: "BUTTON",
								customId: "no",
								style: 4,
							},
						],
					},
				],
			})
			.then(async (sent) => {
				if (!(sent instanceof Discord.Message)) {
					return;
				}

				sent
					.awaitMessageComponent({
						filter: (press) => press.user.id === interaction.user.id,
						componentType: "BUTTON",
						time: 30000,
					})
					.then(async (press) => {
						await press.deferUpdate();
						if (press.customId === "yes") {
							if (user.id !== process.env.CLIENT_ID) {
								const userDoc = await loadUserInfo(client, serverDoc, user.id);
								for (let i = 0; i < serverDoc.ms.length; i++) {
									if (serverDoc.ms[i]._id === userDoc._id) {
										serverDoc.ms.splice(i, 1);
										break;
									}
								}
								await client.userModel.deleteOne({ _id: userDoc._id });

								updateServer(client, serverDoc.guildID, {
									ms: serverDoc.ms,
								});

								const successEmbed = new Discord.MessageEmbed()
									.setColor(0x000000)
									.setDescription("Reset successful");

								press.followUp({ embeds: [successEmbed], ephemeral: true });
							} else {
								if (!interaction.guild) {
									return;
								}

								await client.userModel.deleteMany({
									guildID: interaction.guild.id,
								});

								serverDoc.ms = [];

								updateServer(client, serverDoc.guildID, {
									ms: serverDoc.ms,
								});

								const successEmbed = new Discord.MessageEmbed()
									.setColor(0x000000)
									.setDescription("Reset successful");

								press.followUp({ embeds: [successEmbed], ephemeral: true });
							}
						} else {
							const abortEmbed = new Discord.MessageEmbed()
								.setColor(0x000000)
								.setDescription("Reset Aborted");

							return press.followUp({ embeds: [abortEmbed], ephemeral: true });
						}
					})
					.catch(() => {
						const timeoutEmbed = new Discord.MessageEmbed()
							.setColor(0x000000)
							.setDescription("You did not respond in time - reset aborted.");

						return interaction.editReply({ embeds: [timeoutEmbed] });
					});
			});
	},
} as Command;
