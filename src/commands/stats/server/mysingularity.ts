import Discord from "discord.js";

import BaseEmbed from "../../../util/BaseEmbed.js";

import type Command from "../../../interfaces/client/Command.js";
import type { User } from "../../../database/schema/user.js";

export default {
	name: "mysingularity",
	description: "My Singularity statistics for this server",
	type: Discord.ApplicationCommandType.ChatInput,
	category: "general",
	options: [],
	async slashExecute(client, interaction, serverDoc) {
		await interaction.deferReply({ ephemeral: true });

		const populatedDoc = await serverDoc.populate<{ ms: User[] }>("ms");

		const totalProtons = populatedDoc.ms.reduce(
			(acc, val) => acc + val.protons,
			0
		);

		const totalElectrons = populatedDoc.ms.reduce(
			(acc, val) => acc + val.electrons,
			0
		);

		const totalDarkMatter = populatedDoc.ms.reduce(
			(acc, val) => acc + val.darkMatter,
			0
		);

		if (!interaction.guild) {
			return;
		}

		const embed = new BaseEmbed(
			`${interaction.guild.name} - My Singularity Stats`,
			interaction.user
		)
			.setDescription("My Singularity statistics for this server")
			.setThumbnail(interaction.guild.iconURL() as string)
			.addFields([
				{
					name: "Total Protons",
					value: `\`${totalProtons}\``,
					inline: true,
				},
				{
					name: "Total Electrons",
					value: `\`${totalElectrons}\``,
					inline: true,
				},
				{
					name: "Total Dark Matter",
					value: `\`${totalDarkMatter}\``,
					inline: true,
				},
			]);

		interaction.editReply({ embeds: [embed] });
	},
} as Command;
