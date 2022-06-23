import Discord from "discord.js";

import loadUserInfo from "../../util/loadUserInfo.js";
import manageUse from "../../util/manageUse.js";

import Command from "../../interfaces/client/command.js";

export default {
	name: "use",
	description: "Use an item!",
	type: "ms",
	options: [
		{
			name: "item",
			description: "The name of the item you want to use",
			type: "STRING",
			required: true,
		},
	],
	args: [],
	aliases: [],
	example: 'ms use "2x Proton Boost"',
	async slashExecute(client, interaction, serverDoc) {
		await interaction.deferReply({ ephemeral: true });
		const userMS = await loadUserInfo(client, serverDoc, interaction.user.id);
		let selectedItem;

		const items = serverDoc.items;

		for (const item of items) {
			if (item.name === interaction.options.get("item")?.value) {
				selectedItem = item;
			}
		}

		if (!selectedItem) {
			const embed = new Discord.MessageEmbed()
				.setColor(0x000000)
				.setDescription("Please enter the name of the item you wish to use!");

			return interaction.editReply({ embeds: [embed] });
		}

		if (!selectedItem.useable) {
			const embed = new Discord.MessageEmbed()
				.setColor(0x000000)
				.setDescription("This item is not useable!");

			return interaction.editReply({ embeds: [embed] });
		}

		if (
			!userMS.items.includes(interaction.options.get("item")?.value as string)
		) {
			const embed = new Discord.MessageEmbed()
				.setColor(0x000000)
				.setDescription("You do not own this item!");

			return interaction.editReply({ embeds: [embed] });
		}

		const embed = manageUse.activate(client, userMS, selectedItem);

		if (!embed) {
			return;
		}

		return interaction.editReply({ embeds: [embed] });
	},
} as Command;
