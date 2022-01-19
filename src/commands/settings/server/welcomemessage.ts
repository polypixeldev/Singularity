import Discord from "discord.js";

import updateServer from "../../../util/updateServer";

import Command from "../../../interfaces/client/command";

export default {
	name: "welcomemessage",
	description: "Change the server's message for when a memeber joins",
	type: "mod",
	options: [
		{
			name: "channel",
			description: "The channel that the message should be sent in",
			type: "CHANNEL",
			required: true,
		},
		{
			name: "message",
			description:
				'{tag}, {name}, and {mention} are valid placeholders - "none" to turn off welcome messages',
			type: "STRING",
			required: true,
		},
	],
	args: [],
	aliases: [],
	example:
		'settings server welcomemessage #welcome "Welcome, {member-mention}!',
	async slashExecute(client, interaction, serverDoc) {
		await interaction.deferReply({ ephemeral: true });

		if (!interaction.guild) {
			return;
		}

		if (interaction.options.get("message")?.value === "none") {
			if (serverDoc.welcomeChannelID !== "none") {
				updateServer(client, interaction.guild.id, {
					welcomeChannelID: "none",
				});

				const embed = new Discord.MessageEmbed()
					.setColor(0x000000)
					.setDescription(
						"Welcome messages are now toggled off. To turn them on again, run this command with the appropriate arguments."
					);

				return interaction.editReply({ embeds: [embed] });
			} else {
				const embed = new Discord.MessageEmbed()
					.setColor(0x000000)
					.setDescription(
						"Welcome messages are currently toggled off. To turn them on, run this command with the appropriate arguments."
					);

				return interaction.editReply({ embeds: [embed] });
			}
		}

		const welcomeChannel = interaction.options.get("channel")?.channel;

		if (!welcomeChannel) {
			return;
		}

		if (!("isText" in welcomeChannel)) {
			return;
		}

		if (!welcomeChannel.isText()) {
			const embed = new Discord.MessageEmbed()
				.setColor(0x000000)
				.setDescription("This is not a valid text channel!");

			return interaction.editReply({ embeds: [embed] });
		}

		const welcomeMessage = interaction.options.get("message")?.value;

		updateServer(client, interaction.guild.id, {
			welcomeMessage: welcomeMessage,
			welcomeChannelID: welcomeChannel.id,
		}).then(() => {
			const successEmbed = new Discord.MessageEmbed()
				.setColor(0x000000)
				.setDescription(
					`Server welcome message successfully changed to \`${welcomeMessage}\` in channel \`#${welcomeChannel.name}\``
				);
			interaction.editReply({ embeds: [successEmbed] });
		});
	},
} as Command;
