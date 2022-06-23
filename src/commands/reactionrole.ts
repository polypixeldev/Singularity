import Discord from "discord.js";

import updateServer from "../util/updateServer.js";

import type Command from "../interfaces/client/command.js";

export default {
	name: "reactionrole",
	description: "Instantiates a new reaction role",
	options: [
		{
			name: "emoji",
			description: "The emoji users should react to receive the role",
			type: "STRING",
			required: true,
		},
		{
			name: "role",
			description: "The role users will receive when they react",
			type: "ROLE",
			required: true,
		},
		{
			name: "message",
			description: "The message I should send that users will react on",
			type: "STRING",
			required: true,
		},
	],
	type: "mod",
	args: ["<emoji>", "<role name>", "<message to send>"],
	aliases: ["rr"],
	example: "reactionrole ⏰ Notify React to get notified!",
	notes: "message will be sent in channel that the command is sent in",
	async slashExecute(client, interaction, serverDoc) {
		await interaction.deferReply({ ephemeral: true });
		const reactionChannel = interaction.channel;
		const emoji = interaction.options.get("emoji")?.value;
		const role = interaction.options.get("role")?.role;
		const messageSend = interaction.options.get("message")?.value;

		if (!reactionChannel || !emoji || !role || !messageSend) {
			return;
		}

		const sentMessage = await reactionChannel.send({
			content: messageSend as string,
		});
		serverDoc.reactionRoles.push([
			role.name as string,
			emoji as string,
			sentMessage.id as string,
		]);
		serverDoc.markModified("reactionRoles");

		await updateServer(client, serverDoc.guildID, {
			reactionRoles: serverDoc.reactionRoles,
		});

		try {
			await sentMessage.react(emoji as Discord.EmojiIdentifierResolvable);
		} catch {
			sentMessage.delete();

			const embed = new Discord.MessageEmbed()
				.setColor(0x000000)
				.setDescription("Invalid emoji");
			return interaction.editReply({ embeds: [embed] });
		}

		const successEmbed = new Discord.MessageEmbed()
			.setColor(0x000000)
			.setDescription("Reaction role added!");
		interaction.editReply({ embeds: [successEmbed] });
	},
} as Command;
