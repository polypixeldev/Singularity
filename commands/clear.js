module.exports = {
	name: "clear",
	description: "Clear messages",
	defaultPermission: true,
	options: [
		{
			name: "amount",
			description: "The number of messages you wish to clear, or all",
			type: "STRING",
			required: true,
		},
	],
	type: "mod",
	args: ["<# of messages to clear> "],
	aliases: ["purge", "delete"],
	example: "clear 100",
	execute(client, Discord, msg, args) {
		if (!msg.member.permissions.has("ADMINISTRATOR")) {
			const embed = new Discord.MessageEmbed()
				.setDescription("You do not have permission to clear messages!")
				.setColor(0x000000);
			return msg.channel.send({ embeds: [embed] });
		}

		if (!args[0]) {
			const embed = new Discord.MessageEmbed()
				.setColor(0x000000)
				.setDescription(
					"Please enter the amount of messages you wish to clear!"
				);
			return msg.channel.send({ embeds: [embed] });
		}

		if (isNaN(args[0])) {
			if (args[0] === "all") {
				msg.channel
					.clone({
						position: msg.channel.rawPosition,
						reason: "Clearing channel message history",
					})
					.then((newChannel) => {
						const embed = new Discord.MessageEmbed()
							.setColor(0x000000)
							.setDescription("Channel message history cleared!");

						newChannel.send({ embeds: [embed] }).then((sent) => {
							setTimeout(() => {
								sent.delete();
							}, 5000);
						});
					});
				msg.channel.delete({ reason: "Clearing channel message history" });
				return;
			} else {
				const embed = new Discord.MessageEmbed()
					.setColor(0x000000)
					.setDescription("Please enter an actual number!");
				return msg.channel.send({ embeds: [embed] });
			}
		}

		if (args[0] > 100) {
			const embed = new Discord.MessageEmbed()
				.setColor(0x000000)
				.setDescription(
					"You are not able to delete over 100 messages at a time!"
				);
			return msg.channel.send({ embeds: [embed] });
		}

		if (args[0] < 1) {
			const embed = new Discord.MessageEmbed()
				.setColor(0x000000)
				.setDescription("You must delete at least one message!");
			return msg.channel.send({ embeds: [embed] });
		}

		msg.delete().then(() => {
			msg.channel
				.bulkDelete(args[0], true)
				.then(async (collection) => {
					const embed = new Discord.MessageEmbed()
						.setDescription(
							`Successfully cleared \`${collection.size}\` messages!`
						)
						.setColor(0x000000);

					msg.channel.send({ embeds: [embed] }).then((sent) => {
						setTimeout(() => {
							sent.delete();
						}, 3000);
					});
				})

				.catch(() => {
					const embed = new Discord.MessageEmbed()
						.setDescription(
							"At this time, you cannot delete messages that are over 14 days old."
						)
						.setColor(0x000000);

					msg.channel.send({ embeds: [embed] });

					return;
				});
		});
	},
	async slashExecute(client, Discord, interaction) {
		await interaction.deferReply({ ephemeral: true });
		if (!interaction.member.permissions.has("ADMINISTRATOR")) {
			const embed = new Discord.MessageEmbed()
				.setDescription("You do not have permission to clear messages!")
				.setColor(0x000000);
			return interaction.editReply({ embeds: [embed] });
		}

		if (isNaN(Number(interaction.options.get("amount").value))) {
			if (interaction.options.get("amount").value === "all") {
				interaction.channel
					.clone({
						position: interaction.channel.rawPosition,
						reason: "Clearing channel message history",
					})
					.then((newChannel) => {
						const embed = new Discord.MessageEmbed()
							.setColor(0x000000)
							.setDescription("Channel message history cleared!");

						newChannel.send({ embeds: [embed] }).then((sent) => {
							setTimeout(() => {
								sent.delete();
							}, 10000);
						});
					});
				interaction.channel.delete({
					reason: "Clearing channel message history",
				});
				return;
			} else {
				const embed = new Discord.MessageEmbed()
					.setColor(0x000000)
					.setDescription("Please enter an actual number!");
				return interaction.editReply({ embeds: [embed] });
			}
		}

		if (Number(interaction.options.get("amount").value) > 100) {
			const embed = new Discord.MessageEmbed()
				.setColor(0x000000)
				.setDescription(
					"You are not able to delete over 100 messages at a time!"
				);
			return interaction.editReply({ embeds: [embed] });
		}

		if (Number(interaction.options.get("amount").value) < 1) {
			const embed = new Discord.MessageEmbed()
				.setColor(0x000000)
				.setDescription("You must delete at least one message!");
			return interaction.editReply({ embeds: [embed] });
		}

		interaction.channel
			.bulkDelete(Number(interaction.options.get("amount").value), true)
			.then(async (collection) => {
				const embed = new Discord.MessageEmbed()
					.setDescription(
						`
                    Successfully cleared \`${collection.size}\` messages!

                    *Note: Some messages may have not been cleared since they are older than 14 days old.*
                    `
					)
					.setColor(0x000000);

				interaction.editReply({ embeds: [embed] });
			})
			.catch(() => {
				const embed = new Discord.MessageEmbed()
					.setDescription("An error occured while clearing the messages.")
					.setColor(0x000000);

				interaction.editReply({ embeds: [embed] });

				return;
			});
	},
};
