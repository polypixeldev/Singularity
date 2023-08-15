import Discord from "discord.js";

import BaseEmbed from "../../../util/BaseEmbed.js";

import type Command from "../../../interfaces/client/Command.js";

export default {
	name: "view",
	description: "The Singularity Shop",
	type: Discord.ApplicationCommandType.ChatInput,
	category: "ms",
	options: [
		{
			name: "item",
			description: "The name of the item you wish to view",
			type: Discord.ApplicationCommandOptionType.String,
			required: false,
		},
	],
	example: "ms shop",
	async slashExecute(client, interaction, serverDoc) {
		await interaction.deferReply({ ephemeral: true });

		const items = serverDoc.items;

		if (interaction.options.get("item")) {
			const item = items.find(
				(item) => item.name === interaction.options.get("item")?.value,
			);
			if (item) {
				if (item.rare === true) {
					const embed = new Discord.EmbedBuilder()
						.setColor(0x000000)
						.setDescription(
							`The specified item is rare and cannot be viewed from the Singularity Shop. Use \`/ms rare\` to view this item`,
						);

					return interaction.editReply({ embeds: [embed] });
				} else {
					const embed = new BaseEmbed(
						`Singularity Shop - ${item.name}`,
						interaction.user,
					)
						.setDescription(
							`*Use \`/ms shop buy <item: ${item.name}> <!quantity>\` to buy this item!*`,
						)
						.addFields([
							{
								name: "Description",
								value: item.description,
								inline: true,
							},
							{
								name: "Price",
								value: `${item.protons} Protons, ${item.electrons} Electrons, ${item.darkMatter} Dark Matter`,
								inline: true,
							},
							{
								name: "Effects",
								value: item.effects,
								inline: true,
							},
						]);

					return interaction.editReply({ embeds: [embed] });
				}
			} else {
				const embed = new Discord.EmbedBuilder()
					.setColor(0x000000)
					.setDescription("The specified item does not exist!");

				return interaction.editReply({ embeds: [embed] });
			}
		} else {
			let itemStr = "";
			for (const item of items) {
				if (item.rare !== true) {
					itemStr =
						itemStr +
						`- **${item.name}**: *${item.protons} Protons, ${item.electrons} Electrons, ${item.darkMatter} Dark Matter* \n`;
				}
			}

			const embed = new BaseEmbed(
				"Singularity Shop",
				interaction.user,
			).setDescription(
				`
        *Use \`/ms shop view <item>\` to get a closer look at an item!*

      **Items: **
      ${itemStr}
      *Use \`/ms shop buy <item> <!quantity>\` to buy an item!*
    `,
			);

			interaction.editReply({ embeds: [embed] });
			return;
		}
	},
} as Command;
