import BaseEmbed from "../../../util/BaseEmbed.js";

import type Command from "../../../interfaces/client/command.js";

export default {
	name: "overview",
	description: "An overview of the current server's statistics",
	type: "general",
	options: [],
	async slashExecute(client, interaction) {
		await interaction.deferReply({ ephemeral: true });

		if (!interaction.guild) {
			return;
		}

		const embed = new BaseEmbed(
			`${interaction.guild.name} - Server Stats`,
			interaction.user
		)
			.setDescription("Various statistics about this server")
			.setThumbnail(interaction.guild.iconURL() as string)
			.addFields([
				{
					name: "Member Count",
					value: `\`${interaction.guild.members.cache.size}\``,
					inline: true,
				},
				{
					name: "Role Count",
					value: `\`${interaction.guild.roles.cache.size}\``,
					inline: true,
				},
				{
					name: "Owner",
					value: `\`${
						interaction.guild.members.resolve(interaction.guild.ownerId)?.user
							.tag
					}\``,
					inline: true,
				},
				{
					name: "Channel Count",
					value: `\`${interaction.guild.channels.cache.size}\``,
					inline: true,
				},
				{
					name: "ID",
					value: `\`${interaction.guild.id}\``,
					inline: true,
				},
				{
					name: "Date Created",
					value: `\`${interaction.guild.createdAt.getMonth()}/${interaction.guild.createdAt.getDate()}/${interaction.guild.createdAt.getFullYear()}\``,
					inline: true,
				},
			]);

		interaction.editReply({ embeds: [embed] });
	},
} as Command;
