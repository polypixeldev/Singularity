import BaseEmbed from "../../../util/BaseEmbed.js";

import Command from "../../../interfaces/client/command.js";

export default {
	name: "help",
	description: "Singularity Bot Settings",
	type: "mod",
	options: [],
	example: "settings bot",
	async slashExecute(client, interaction) {
		await interaction.deferReply({ ephemeral: true });

		if (!interaction.guild || !client.user) {
			return;
		}

		const embed = new BaseEmbed(
			`Singularity Bot Settings - ${interaction.guild.name}`,
			interaction.user
		).setDescription(
			`
			**Nickname Me:**  \`/settings bot nickname <nickname>\`
				*- Current Setting:* \`${
					interaction.guild.members.resolve(client.user)?.nickname
						? interaction.guild.members.resolve(client.user)?.nickname
						: "None"
				}\`
			**Kick Me:** \`/settings bot kick\`
		`
		);

		return interaction.editReply({ embeds: [embed] });
	},
} as Command;
