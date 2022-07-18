import Discord from "discord.js";

import type Command from "../interfaces/client/Command.js";

export default {
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
	async slashExecute(client, interaction) {
		await interaction.deferReply({ ephemeral: true });

		if (!(interaction.member instanceof Discord.GuildMember)) {
			return;
		}

		if (
			!interaction.member.permissions.has(
				Discord.PermissionFlagsBits.Administrator
			)
		) {
			const embed = new Discord.EmbedBuilder()
				.setDescription("You do not have permission to clear messages!")
				.setColor(0x000000);
			return interaction.editReply({ embeds: [embed] });
		}

		if (!Number.isInteger(Number(interaction.options.get("amount")?.value))) {
			if (interaction.options.get("amount")?.value === "all") {
				if (!interaction.channel) {
					return;
				}

				if (!("clone" in interaction.channel)) {
					return;
				}

				interaction.channel
					.clone({
						position: interaction.channel.rawPosition,
						reason: "Clearing channel message history",
					})
					.then((newChannel) => {
						const embed = new Discord.EmbedBuilder()
							.setColor(0x000000)
							.setDescription(
								"Channel message history cleared! \n *This message will self-delete*"
							);

						newChannel.send({ embeds: [embed] }).then((sent) => {
							setTimeout(() => {
								sent.delete().catch(() => null);
							}, 10000);
						});
					});

				interaction.channel.delete("Clearing channel message history");
				return;
			} else {
				const embed = new Discord.EmbedBuilder()
					.setColor(0x000000)
					.setDescription("Please enter a valid integer!");
				return interaction.editReply({ embeds: [embed] });
			}
		}

		if (Number(interaction.options.get("amount")?.value) > 100) {
			const embed = new Discord.EmbedBuilder()
				.setColor(0x000000)
				.setDescription(
					"You are not able to delete over 100 messages at a time!"
				);
			return interaction.editReply({ embeds: [embed] });
		}

		if (Number(interaction.options.get("amount")?.value) < 1) {
			const embed = new Discord.EmbedBuilder()
				.setColor(0x000000)
				.setDescription("You must delete at least one message!");
			return interaction.editReply({ embeds: [embed] });
		}

		if (!interaction.channel) {
			return;
		}

		if (!("bulkDelete" in interaction.channel)) {
			return;
		}

		interaction.channel
			?.bulkDelete(Number(interaction.options.get("amount")?.value), true)
			.then(async (collection) => {
				const embed = new Discord.EmbedBuilder()
					.setDescription(
						`
                    Successfully cleared \`${collection.size}\` messages!

                    *Note: Some messages may have not been cleared since they are older than 14 days old.*
                    `
					)
					.setColor(0x000000);

				interaction.editReply({ embeds: [embed] });
			})
			.catch((err) => {
				console.error(err);
				const embed = new Discord.EmbedBuilder()
					.setDescription("An error occured while clearing the messages.")
					.setColor(0x000000);

				interaction.editReply({ embeds: [embed] });

				return;
			});
	},
} as Command;
