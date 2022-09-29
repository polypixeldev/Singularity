import Discord from "discord.js";

import BaseEmbed from "../../../util/BaseEmbed.js";

import type Command from "../../../interfaces/client/Command.js";

export default {
	name: "help",
	description: "Singularity Server Settings",
	type: Discord.ApplicationCommandType.ChatInput,
	category: "ms",
	options: [],
	args: [],
	aliases: [],
	example: "settings server",
	async slashExecute(client, interaction, serverDoc) {
		await interaction.deferReply({ ephemeral: true });

		if (!interaction.guild) {
			return;
		}

		const embed = new BaseEmbed(
			`Singularity Server Settings - ${interaction.guild.name}`,
			interaction.user
		).setDescription(
			`
			**Set/Toggle a Welcome Message:** \`/settings server welcome <channel> <message>\`
				*- Current Setting:* \`${serverDoc.welcomeMessage}\` *in* \`${
				interaction.guild.channels.resolve(serverDoc.welcomeChannelID)?.name ??
				"None"
			}\`
			**Set/Toggle a Leave Message:** \`/settings server leave <channel> <message>\`
				*- Current Setting:* \`${serverDoc.leaveMessage}\` *in* \`${
				interaction.guild.channels.resolve(serverDoc.leaveChannelID)?.name ??
				"None"
			}\`
		`
		);

		return interaction.editReply({ embeds: [embed] });
	},
} as Command;
