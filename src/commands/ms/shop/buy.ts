import Discord from "discord.js";

import loadUserInfo from "../../../util/loadUserInfo.js";
import updateUser from "../../../util/updateUser.js";

import type Command from "../../../interfaces/client/Command.js";
import type Item from "../../../interfaces/user/Item.js";

export default {
	name: "buy",
	description: "Buy an item from the Singularity Shop!",
	type: "ms",
	options: [
		{
			name: "item",
			description: "The name of the item you want to buy",
			type: "STRING",
			required: true,
		},
		{
			name: "quantity",
			description: "How many of the item you want to buy - defaults to 1",
			type: "INTEGER",
			required: false,
		},
	],
	args: [],
	aliases: [],
	example: "ms buy trophy",
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
			const embed = new Discord.EmbedBuilder()
				.setColor(0x000000)
				.setDescription("That is not a valid item!");

			return interaction.editReply({ embeds: [embed] });
		}

		let quantity = Number(interaction.options.get("quantity")?.value);
		if (!quantity) quantity = 1;
		if (quantity < 1) {
			const embed = new Discord.EmbedBuilder()
				.setColor(0x000000)
				.setDescription("You must specify a positive quantity!");

			return interaction.editReply({ embeds: [embed] });
		}

		if (
			userMS.protons >= selectedItem.protons * quantity &&
			userMS.electrons >= selectedItem.electrons * quantity &&
			userMS.darkMatter >= selectedItem.darkMatter * quantity
		) {
			userMS.protons -= selectedItem.protons * quantity;
			userMS.electrons -= selectedItem.electrons * quantity;
			userMS.darkMatter -= selectedItem.darkMatter * quantity;

			userMS.items.push(selectedItem.name);

			updateUser(client, serverDoc.guildID, userMS.userID, {
				...userMS.toObject(),
				protons: userMS.protons,
				electrons: userMS.electrons,
				darkMatter: userMS.darkMatter,
				items: userMS.items,
			}).then(() => {
				if (!selectedItem) {
					return;
				}

				const embed = new Discord.EmbedBuilder().setColor(0x000000)
					.setDescription(`
				Purchase completed!

				\t + **${quantity}** ${selectedItem.name}
				\t - **${selectedItem.protons * quantity}** Protons
				\t - **${selectedItem.electrons * quantity}** Electrons
				\t - **${selectedItem.darkMatter * quantity}** Dark Matter

				You now have:
				\t **${userMS.protons}** Protons
				\t **${userMS.electrons}** Electrons
				\t **${userMS.darkMatter}** Dark Matter
			`);

				return interaction.editReply({ embeds: [embed] });
			});
		} else {
			let missingArr = [
				userMS.protons - selectedItem.protons * quantity,
				userMS.electrons - selectedItem.electrons * quantity,
				userMS.darkMatter - selectedItem.darkMatter * quantity,
			];

			missingArr = missingArr.map((type) => {
				if (type > 0) {
					type = 0;
				} else {
					type = Math.abs(type);
				}

				return type;
			});

			const embed = new Discord.EmbedBuilder().setColor(0x000000)
				.setDescription(`
				You do not have enough resources needed to buy this item!

				Missing:
				 - **${missingArr[0]}** Protons
				 - **${missingArr[1]}** Electrons
				 - **${missingArr[2]}** Dark Matter
			`);

			return interaction.editReply({ embeds: [embed] });
		}
	},
} as Command;
