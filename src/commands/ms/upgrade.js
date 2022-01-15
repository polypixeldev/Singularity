export default {
	name: "upgrade",
	description: "Upgrade your Singularity!",
	type: "ms",
	options: [],
	args: [],
	aliases: [],
	example: "ms upgrade",
	async slashExecute(client, Discord, interaction, serverDoc) {
		await interaction.deferReply({ ephemeral: true });
		let userMS = await client.utils.loadUserInfo(
			client,
			serverDoc,
			interaction.user.id
		);
		let limit = -1;
		let remaining = {
			protons: userMS.protons,
			electrons: userMS.electrons,
		};
		remaining.protons -= userMS.singularity.size * 25;
		remaining.electrons -= userMS.singularity.size * 7;
		do {
			remaining.protons -= 1000;
			remaining.electrons -= 250;
			limit++;
		} while (remaining.protons > 0 && remaining.electrons > 0);

		const embed = new client.utils.BaseEmbed(
			"Singularity Upgrade",
			interaction.user
		).setDescription(
			`
			**Current Singularity Size:** *${userMS.singularity.size}*
			**Current Protons:** *${userMS.protons}*
			**Current Electrons:** *${userMS.electrons}*

			**Amount of Protons Per Additional Upgrade:** *1000*
			**Amount of Electrons Per Additional Upgrade:** *250*
			**Current Size Fee:** *${userMS.singularity.size * 25} Protons & ${
				userMS.singularity.size * 7
			} Electons*
			**Amount Needed for 1 Upgrade:** *${
				5000 + userMS.singularity.size * 25
			} Protons & ${1000 + userMS.singularity.size * 7} Electrons*

			**Maximum Upgrades Available: ** *${limit}*

			*Respond with the desired number of upgrades within 30 seconds*
		`
		);

		let components = [
			{
				type: "ACTION_ROW",
				components: [
					{
						type: "SELECT_MENU",
						label: "Upgrade Quantity",
						custom_id: "quantity",
						options: [
							{
								label: "1x Upgrade",
								value: "1",
								description: "Upgrade your Singularity once",
							},
							{
								label: "2x Upgrade",
								value: "2",
								description: "Upgrade your Singularity twice",
							},
							{
								label: "3x Upgrade",
								value: "3",
								description: "Upgrade your Singularity thrice",
							},
							{
								label: "5x Upgrade",
								value: "5",
								description: "Upgrade your Singularity 5 times",
							},
							{
								label: "10x Upgrade",
								value: "10",
								description: "Upgrade your Singularity 10 times",
							},
						],
					},
				],
			},
		];

		interaction
			.editReply({
				embeds: [embed],
				components: components,
			})
			.then((sent) => {
				sent
					.awaitMessageComponent({
						filter: (inter) => inter.user.id === interaction.user.id,
						time: 30000,
						componentType: "SELECT_MENU",
					})
					.then(async (selectionInteraction) => {
						await selectionInteraction.deferUpdate();
						components[0].components[0].disabled = true;
						interaction.editReply({
							embeds: [embed],
							components: components,
						});
						let num = Number(selectionInteraction.values[0]);

						if (num > limit) {
							const embed = new Discord.MessageEmbed()
								.setColor(0x000000)
								.setDescription(
									"You do not have enough protons/electrons to upgrade your Singularity size this much!"
								);

							return interaction.followUp({ embeds: [embed], ephemeral: true });
						} else if (num <= 0) {
							const embed = new Discord.MessageEmbed()
								.setColor(0x000000)
								.setDescription("Upgrade Aborted.");

							return interaction.followUp({ embeds: [embed], ephemeral: true });
						} else {
							userMS.electrons -= num * 250;
							userMS.protons -= num * 1000;
							userMS.electrons -= userMS.singularity.size * 7;
							userMS.protons -= userMS.singularity.size * 25;
							for (let i = 0; i < num; i++) {
								userMS.singularity.size += Math.floor(Math.random() * 9 + 1);
							}
							client.utils
								.updateUser(client, serverDoc.guildID, userMS.userID, userMS)
								.then(() => {
									const embed = new Discord.MessageEmbed()
										.setColor(0x000000)
										.setDescription(
											`Congrats! Your Singularity is now size \`${userMS.singularity.size}\`!`
										);

									return interaction.followUp({
										embeds: [embed],
										ephemeral: true,
									});
								});
						}
					})
					.catch(() => {
						const embed = new Discord.MessageEmbed()
							.setColor(0x000000)
							.setDescription(
								"You did not respond with a valid number in time."
							);
						return interaction.followUp({ embeds: [embed], ephemeral: true });
					});
			});
	},
};
