import Discord from "discord.js";

import updateServer from "../../../util/updateServer.js";

import Command from "../../../interfaces/client/command.js";

export default {
	name: "leavemessage",
	description: "Change the server's message for when a member leaves",
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
				'{tag} and {name} are valid placeholders - "none" to turn off leave messages',
			type: "STRING",
			required: true,
		},
	],
	args: [],
	aliases: [],
	example: 'settings server leavemessage #goodbye "Goodbye, {member-tag}"',
	async slashExecute(client, interaction, serverDoc) {
		await interaction.deferReply({ ephemeral: true });

		if (!interaction.guild) {
			return;
		}

		if (interaction.options.get("message")?.value === "none") {
			if (serverDoc.leaveChannelID !== "none") {
				updateServer(client, interaction.guild.id, {
					leaveChannelID: "none",
				});

				const embed = new Discord.MessageEmbed()
					.setColor(0x000000)
					.setDescription(
						"Leave messages are now toggled off. To turn them on again, run this command with the appropriate arguments."
					);

				return interaction.editReply({ embeds: [embed] });
			} else {
				const embed = new Discord.MessageEmbed()
					.setColor(0x000000)
					.setDescription(
						"Leave messages are currently toggled off. To turn them on, run this command with the appropriate arguments."
					);

				return interaction.editReply({ embeds: [embed] });
			}
		}

		const leaveChannel = interaction.options.get("channel")?.channel;

		if (!leaveChannel) {
			return;
		}

		if (!("isText" in leaveChannel)) {
			return;
		}

		if (!leaveChannel?.isText()) {
			const embed = new Discord.MessageEmbed()
				.setColor(0x000000)
				.setDescription("This is not a valid text channel!");

			return interaction.editReply({ embeds: [embed] });
		}

		const leaveMessage = interaction.options.get("message")?.value;

		updateServer(client, interaction.guild.id, {
			leaveMessage: leaveMessage,
			leaveChannelID: leaveChannel.id,
		}).then(() => {
			const embed = new Discord.MessageEmbed()
				.setColor(0x000000)
				.setDescription(
					`Server leave message successfully changed to \`${leaveMessage}\` in channel \`#${leaveChannel.name}\``
				);

			interaction.editReply({ embeds: [embed] });
		});
	},
} as Command;
