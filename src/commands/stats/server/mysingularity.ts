import BaseEmbed from "../../../util/BaseEmbed";

import Command from "../../../interfaces/client/command";
import { User } from "../../../database/schema/user";

export default {
	name: "mysingularity",
	description: "My Singularity statistics for this server",
	type: "general",
	options: [],
	async slashExecute(client, interaction, serverDoc) {
		await interaction.deferReply({ ephemeral: true });

		serverDoc = await serverDoc.populate<{ ms: User[] }>("ms");

		const totalProtons = serverDoc.ms.reduce(
			// @ts-expect-error: Populate array not implemented in mongoose?
			(acc, val) => acc + val.protons,
			0
		);

		const totalElectrons = serverDoc.ms.reduce(
			// @ts-expect-error: Populate array not implemented in mongoose?
			(acc, val) => acc + val.electrons,
			0
		);

		const totalDarkMatter = serverDoc.ms.reduce(
			// @ts-expect-error: Populate array not implemented in mongoose?
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
