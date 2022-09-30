import Discord from "discord.js";

import loadUserInfo from "../../../util/loadUserInfo.js";
import loadGuildInfo from "../../../util/loadGuildInfo.js";
import updateUser from "../../../util/updateUser.js";

import type Command from "../../../interfaces/client/Command.js";

export default {
	name: "start",
	description: "Start prestiging your Singularity!",
	options: [],
	type: Discord.ApplicationCommandType.ChatInput,
	category: "ms",
	example: "ms prestige start",
	async slashExecute(client, interaction, serverDoc) {
		await interaction.deferReply({ ephemeral: true });

		const userMS = await loadUserInfo(client, serverDoc, interaction.user.id);

		const baseReq =
			(userMS.singularity.prestige + 2) *
			((userMS.singularity.prestige + 2) * 2);

		if (
			userMS.protons >= baseReq * 125000 &&
			userMS.electrons >= baseReq * 41666 &&
			userMS.darkMatter >= baseReq * 6
		) {
			const firstEmbed = new Discord.EmbedBuilder()
				.setColor(0x000000)
				.setTitle("Are You Sure?").setDescription(`
					  Prestiging has many benefits, but it is a destructive action. **Prestiging is not reversible.**
  
					  If you are sure you want to prestige now, click \`Yes\`
  
					  If not, click \`No\`
				  `);

			const row =
				new Discord.ActionRowBuilder<Discord.ButtonBuilder>().addComponents(
					new Discord.ButtonBuilder()
						.setLabel("Yes")
						.setCustomId("Yes")
						.setStyle(Discord.ButtonStyle.Success),
					new Discord.ButtonBuilder()
						.setLabel("No")
						.setCustomId("No")
						.setStyle(Discord.ButtonStyle.Danger)
				);

			const confirmation = await interaction.editReply({
				embeds: [firstEmbed],
				components: [row],
			});

			if (!(confirmation instanceof Discord.Message)) {
				return;
			}

			confirmation
				.awaitMessageComponent({
					time: 30000,
					filter: (answer) => answer.user.id === interaction.user.id,
				})
				.then(async (answer) => {
					await answer.deferReply({ ephemeral: true });

					if (!interaction.guild) {
						return;
					}

					if (answer.customId === "Yes") {
						const newServerDoc = await loadGuildInfo(client, interaction.guild);
						const newUserMS = await loadUserInfo(
							client,
							newServerDoc,
							interaction.user.id
						);

						const rareItems = newServerDoc.items.filter(
							(item) => item.rare === true
						);

						newUserMS.userID = interaction.user.id;
						newUserMS.protons = 0;
						newUserMS.electrons = 0;
						newUserMS.items = [];
						for (let i = 0; i < newUserMS.singularity.prestige + 2; i++) {
							newUserMS.rareItems.push(
								rareItems[
									Math.abs(Math.floor(Math.random() * rareItems.length))
								].name ?? rareItems[rareItems.length - 1].name
							);
						}

						newUserMS.darkMatter = 0;
						newUserMS.active = [];
						newUserMS.singularity = {
							type:
								newServerDoc.types[
									Math.abs(
										Math.floor(Math.random() * newServerDoc.types.length)
									)
								] ?? newServerDoc.types[newServerDoc.types.length - 1],
							size: 10,
							ferocity: newUserMS.singularity.ferocity + 5,
							prestige: newUserMS.singularity.prestige + 1,
						};

						updateUser(
							client,
							newServerDoc.guildID,
							newUserMS.userID,
							newUserMS
						).then(() => {
							interaction.editReply({
								embeds: [firstEmbed],
								components: [
									{
										type: Discord.ComponentType.ActionRow,
										components: [
											{
												type: Discord.ComponentType.Button,
												label: "Yes",
												customId: "Yes",
												style: Discord.ButtonStyle.Success,
												disabled: true,
											},
											{
												type: Discord.ComponentType.Button,
												label: "No",
												customId: "No",
												style: Discord.ButtonStyle.Danger,
												disabled: true,
											},
										],
									},
								],
							});
							const embed = new Discord.EmbedBuilder()
								.setColor(0x000000)
								.setDescription("Congratulations! Prestige Successful!");

							return answer.editReply({ embeds: [embed] });
						});
					} else {
						interaction.editReply({
							embeds: [firstEmbed],
							components: [
								{
									type: Discord.ComponentType.ActionRow,
									components: [
										{
											type: Discord.ComponentType.Button,
											label: "Yes",
											customId: "Yes",
											style: Discord.ButtonStyle.Success,
											disabled: true,
										},
										{
											type: Discord.ComponentType.Button,
											label: "No",
											customId: "No",
											style: Discord.ButtonStyle.Danger,
											disabled: true,
										},
									],
								},
							],
						});
						const embed = new Discord.EmbedBuilder()
							.setColor(0x000000)
							.setDescription("Prestige Aborted");

						return answer.editReply({ embeds: [embed] });
					}
				});
		} else {
			const embed = new Discord.EmbedBuilder().setColor(0x000000)
				.setDescription(`
					  *You do not have enough resources to prestige! You need:*
					  - **${baseReq * 125000}** Protons
					  - **${baseReq * 41666}** Electrons
					  - **${baseReq * 6}** Dark Matter
  
					  *Enter \`/ms prestige info\` to learn more about Singularity Prestige*
				  `);

			return interaction.editReply({ embeds: [embed] });
		}
	},
} as Command;
