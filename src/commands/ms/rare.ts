import BaseEmbed from "../../util/BaseEmbed.js";

import type Command from "../../interfaces/client/Command.js";

export default {
	name: "rare",
	description: "Display the list of Rare Items",
	type: "ms",
	example: "ms rare",
	options: [],
	async slashExecute(client, interaction, serverDoc) {
		await interaction.deferReply({ ephemeral: true });

		const rareItems = serverDoc.items.filter((item) => item.rare === true);
		const embed = new BaseEmbed(
			`My Singularity - Rare Items`,
			interaction.user
		).setDescription(
			"These items are **rare**, and cannot be bought from the Singularity shop. Instead, you have a chance to find them when doing special actions, such as prestiging."
		);
		for (const item of rareItems) {
			embed.addField(item.name, item.description);
		}

		interaction.editReply({ embeds: [embed] });
	},
} as Command;
