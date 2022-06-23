import Discord from "discord.js";

import loadUserInfo from "../../../util/loadUserInfo.js";
import updateUser from "../../../util/updateUser.js";

import Command from "../../../interfaces/client/command.js";
import Item from "../../../interfaces/user/item.js";

export default {
	name: "sell",
	description: "Sell an item to the Singularity Shop!",
	type: "ms",
	options: [
		{
			name: "item",
			description: "The name of the item/power-up you want to sell",
			type: "STRING",
			required: true,
		},
		{
			name: "quantity",
			description: "How many of the item you want to sell - defaults to 1",
			type: "INTEGER",
			required: false,
		},
	],
	args: [],
	aliases: [],
	example: "ms shop sell trophy",
	async slashExecute(client, interaction, serverDoc) {
		await interaction.deferReply({ ephemeral: true });
		const userMS = await loadUserInfo(client, serverDoc, interaction.user.id);
		let selectedItem: Item | null = null;

		const items = serverDoc.items;

		for (const item of items) {
			if (
				item.name === interaction.options.get("item")?.value &&
				item.rare !== true
			) {
				selectedItem = item;
				break;
			} else {
				selectedItem = null;
			}
		}

		if (!selectedItem) {
			const embed = new Discord.MessageEmbed()
				.setColor(0x000000)
				.setDescription("That is not a valid item!");

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

		let quantity = Number(interaction.options.get("quantity")?.value);
		if (!quantity) quantity = 1;
		if (quantity < 1) {
			const embed = new Discord.MessageEmbed()
				.setColor(0x000000)
				.setDescription("You must specify a positive quantity!");

			return interaction.editReply({ embeds: [embed] });
		}

		const protons = (selectedItem.protons * quantity) / 2;
		const electrons = (selectedItem.electrons * quantity) / 2;
		const darkMatter = (selectedItem.darkMatter * quantity) / 2;

		let removed = 0;

		for (let i = 0; i < userMS.items.length; i++) {
			if (
				userMS.items[i] === interaction.options.get("item")?.value &&
				removed <= quantity
			) {
				userMS.items[i] = "_NULL_";
				removed++;
			}
		}

		if (removed < quantity) {
			const embed = new Discord.MessageEmbed()
				.setColor(0x000000)
				.setDescription("You do not have that many of the specified item!");

			return interaction.editReply({ embeds: [embed] });
		}
		userMS.protons += protons;
		userMS.electrons += electrons;
		userMS.darkMatter += darkMatter;

		updateUser(client, serverDoc.guildID, userMS.userID, {
			...userMS.toObject(),
			protons: userMS.protons,
			electrons: userMS.electrons,
			darkMatter: userMS.darkMatter,
			items: userMS.items.filter((item) => item !== "_NULL_"),
		}).then(() => {
			if (!selectedItem) {
				return;
			}

			const embed = new Discord.MessageEmbed().setColor(0x000000)
				.setDescription(`
			Sale completed!

			\t - **${quantity}** ${selectedItem.name}
			\t + **${protons}** Protons
			\t + **${electrons}** Electrons
			\t + **${darkMatter}** Dark Matter

			You now have:
			\t **${userMS.protons}** Protons
			\t **${userMS.electrons}** Electrons
			\t **${userMS.darkMatter}** Dark Matter
		`);

			return interaction.editReply({ embeds: [embed] });
		});
	},
} as Command;
