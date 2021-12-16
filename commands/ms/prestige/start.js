module.exports = {
	name: "start",
	description: "Start prestiging your Singularity!",
	options: [],
	example: "ms prestige start",
	async slashExecute(client, Discord, interaction, serverDoc) {
		await interaction.deferReply({ ephemeral: true });

		let userMS = await client.utils.loadUserInfo(
			client,
			serverDoc,
			interaction.user.id
		);

		let baseReq =
			(userMS.singularity.prestige + 2) *
			((userMS.singularity.prestige + 2) * 2);

		if (
			userMS.protons >= baseReq * 125000 &&
			userMS.electrons >= baseReq * 41666 &&
			userMS.darkMatter >= baseReq * 6
		) {
			const firstEmbed = new Discord.MessageEmbed()
				.setColor(0x000000)
				.setTitle("Are You Sure?").setDescription(`
					  Prestiging has many benefits, but it is a destructive action. **Prestiging is not reversible.**
  
					  If you are sure you want to prestige now, click \`Yes\`
  
					  If not, click \`No\`
				  `);

			let confirmation = await interaction.editReply({
				embeds: [firstEmbed],
				components: [
					{
						type: "ACTION_ROW",
						components: [
							{
								type: "BUTTON",
								label: "Yes",
								customId: "Yes",
								style: "SUCCESS",
							},
							{
								type: "BUTTON",
								label: "No",
								customId: "No",
								style: "DANGER",
							},
						],
					},
				],
			});

			confirmation
				.awaitMessageComponent({
					time: 30000,
					filter: (answer) => answer.user.id === interaction.user.id,
				})
				.then(async (answer) => {
					await answer.deferReply({ ephemeral: true });
					if (answer.customId === "Yes") {
						const newServerDoc = await client.utils.loadGuildInfo(
							client,
							interaction.guild
						);
						let newUserMS = await client.utils.loadUserInfo(
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
								] ?? rareItems[rareItems.length - 1]
							);
						}
						newUserMS.powerUps = [];
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

						client.utils
							.updateUser(
								client,
								newServerDoc.guildID,
								newUserMS.userID,
								newUserMS
							)
							.then(() => {
								interaction.editReply({
									embeds: [firstEmbed],
									components: [
										{
											type: "ACTION_ROW",
											components: [
												{
													type: "BUTTON",
													label: "Yes",
													customId: "Yes",
													style: "SUCCESS",
													disabled: true,
												},
												{
													type: "BUTTON",
													label: "No",
													customId: "No",
													style: "DANGER",
													disabled: true,
												},
											],
										},
									],
								});
								const embed = new Discord.MessageEmbed()
									.setColor(0x000000)
									.setDescription("Congratulations! Prestige Successful!");

								return answer.editReply({ embeds: [embed] });
							});
					} else {
						interaction.editReply({
							embeds: [firstEmbed],
							components: [
								{
									type: "ACTION_ROW",
									components: [
										{
											type: "BUTTON",
											label: "Yes",
											customId: "Yes",
											style: "SUCCESS",
											disabled: true,
										},
										{
											type: "BUTTON",
											label: "No",
											customId: "No",
											style: "DANGER",
											disabled: true,
										},
									],
								},
							],
						});
						const embed = new Discord.MessageEmbed()
							.setColor(0x000000)
							.setDescription("Prestige Aborted");

						return answer.editReply({ embeds: [embed] });
					}
				})
				.catch(() => {});
		} else {
			const embed = new Discord.MessageEmbed().setColor(0x000000)
				.setDescription(`
					  *You do not have enough resources to prestige! You need:*
					  - **${baseReq * 125000}** Protons
					  - **${baseReq * 41666}** Electrons
					  - **${baseReq * 6}** Dark Matter
  
					  *Enter \`${
							serverDoc.prefix
						}ms prestige info\` to learn more about Singularity Prestige*
				  `);

			return interaction.editReply({ embeds: [embed] });
		}
	},
};
