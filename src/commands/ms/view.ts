import prettyMS from "pretty-ms";
import Discord from "discord.js";

import loadUserInfo from "../../util/loadUserInfo.js";
import BaseEmbed from "../../util/BaseEmbed.js";

import type Command from "../../interfaces/client/Command.js";

export default {
	name: "view",
	description: "View people's Singularity!",
	type: Discord.ApplicationCommandType.ChatInput,
	category: "ms",
	options: [
		{
			name: "user",
			description: "The user that you want to view - defaults to yourself",
			type: Discord.ApplicationCommandOptionType.User,
			required: false,
		},
	],
	async slashExecute(client, interaction, serverDoc) {
		await interaction.deferReply({ ephemeral: true });
		const user = interaction.options.get("user")?.user ?? interaction.user;
		if (user.bot) {
			const embed = new Discord.EmbedBuilder()
				.setColor(0x000000)
				.setDescription(
					"Bots are not powerful enough to have their own Singularity!"
				);

			return interaction.editReply({ embeds: [embed] });
		}
		const userMS = await loadUserInfo(client, serverDoc, user.id);

		let itemStr = "\n";
		for (const item of userMS.items) {
			itemStr = itemStr + `- **${item}** \n `;
		}
		if (itemStr === "\n") itemStr = "**None**";

		let aStr = "\n";
		for (const a of userMS.active) {
			aStr =
				aStr +
				`- **${a.name}** - ${prettyMS(
					a.time * 1000 - (Date.now() - a.start)
				)} left \n `;
		}
		if (aStr === "\n") aStr = "**None**";

		let rareStr = "";
		for (const rare of userMS.rareItems) {
			rareStr = rareStr + "\n";
			rareStr = rareStr + `- **${rare}**`;
		}
		if (rareStr === "") rareStr = "**None**";

		const embed = new BaseEmbed(`${user.tag}'s Singularity`, interaction.user)
			.setThumbnail(user.displayAvatarURL())
			.addFields([
				{
					name: "User Stats",
					value: `
								Protons: **${userMS.protons}**
								Electrons: **${userMS.electrons}**
								Dark Matter: **${userMS.darkMatter}**
								Items: ${itemStr}
								Rare Items: ${rareStr}
								Active Power-Ups: ${aStr}
								Lifetime Experience: **${userMS.lifeExp}**
							`,
				},
				{
					name: "Singularity Stats",
					value: `
								Singularity Type: **${userMS.singularity.type}**
								Singularity Size: **${userMS.singularity.size}**
								Singularity Ferocity: **${userMS.singularity.ferocity}**
								Times Prestiged: **${userMS.singularity.prestige}**
							`,
				},
			]);

		interaction.editReply({ embeds: [embed] });
	},
} as Command;
