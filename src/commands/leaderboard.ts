import BaseEmbed from "../util/BaseEmbed";

import Command from "../interfaces/client/command";

export default {
	name: "leaderboard",
	description: "Shows the server leaderboard",
	type: "general",
	options: [],
	args: [],
	aliases: ["lb"],
	example: "leaderboard",
	async slashExecute(client, interaction, serverDoc) {
		await interaction.deferReply({ ephemeral: true });
		await serverDoc.populate("ms");
		const xpArr = [];

		if (!interaction.guild) {
			return;
		}

		for (const user of serverDoc.ms) {
			// @ts-expect-error: Populate array not yet supported in mongoose
			if (user.userID) {
				// @ts-expect-error: Populate array not yet supported in mongoose
				const member = await interaction.guild.members.fetch(user.userID);
				if (member) {
					// @ts-expect-error: Populate array not yet supported in mongoose
					xpArr.push([member.user.tag, user.lifeExp]);
				}
			}
		}
		const sort = xpArr.sort((a, b) => b[1] - a[1]);

		let lbStr = ``;

		for (let i = 0; i < sort.length; i++) {
			lbStr =
				lbStr + `**${i + 1}.** **${sort[i][0]}** - **${sort[i][1]} EXP** \n`;
		}

		const embed = new BaseEmbed(
			`${interaction.guild.name}'s Leaderboard`,
			interaction.user
		).setDescription(lbStr);

		return interaction.editReply({ embeds: [embed] });
	},
} as Command;
