export default {
	name: "leaderboard",
	description: "Shows the server leaderboard",
	defaultPermission: true,
	options: [],
	args: [],
	aliases: ["lb"],
	example: "leaderboard",
	async slashExecute(client, Discord, interaction, serverDoc) {
		await interaction.deferReply({ ephemeral: true });
		await serverDoc.populate("ms");
		const xpArr = [];
		for (const user of serverDoc.ms) {
			if (user.userID) {
				const member = await interaction.guild.members.fetch(user.userID);
				if (member) {
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

		const embed = new client.utils.BaseEmbed(
			`${interaction.guild.name}'s Leaderboard`,
			interaction.user
		).setDescription(lbStr);

		return interaction.editReply({ embeds: [embed] });
	},
};
