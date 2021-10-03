module.exports = {
	name: "leaderboard",
	description: "Shows the server leaderboard",
	defaultPermission: true,
	options: [],
	args: [],
	aliases: ["lb"],
	example: "leaderboard",
	async execute(client, Discord, msg, args, serverDoc) {
		await serverDoc.populate("ms").execPopulate();
		let xpArr = [];
		for (let user of serverDoc.ms) {
			if (user.userID) {
				let member = msg.guild.members.resolve(user.userID);
				if (member) {
					xpArr.push([member.user.tag, user.lifeExp]);
				}
			}
		}
		let sort = xpArr.sort((a, b) => b[1] - a[1]);

		let lbStr = ``;

		for (let i = 0; i < sort.length; i++) {
			lbStr =
				lbStr + `**${i + 1}.** **${sort[i][0]}** - **${sort[i][1]} EXP** \n`;
		}

		let currentDate = new Date(Date.now());

		const embed = new Discord.MessageEmbed()
			.setColor(0x000000)
			.setTitle(`${msg.guild.name}'s Leaderboard`)
			.setDescription(lbStr)
			.setFooter(
				`${msg.guild.name}'s leaderboard requested by ${
					msg.author.tag
				} • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`,
				msg.author.displayAvatarURL()
			);

		return msg.channel.send({ embeds: [embed] });
	},
	async slashExecute(client, Discord, interaction, serverDoc) {
		await interaction.deferReply({ ephemeral: true });
		await serverDoc.populate("ms");
		let xpArr = [];
		console.log(serverDoc.ms);
		for (let user of serverDoc.ms) {
			if (user.userID) {
				let member = await interaction.guild.members.fetch(user.userID);
				if (member) {
					xpArr.push([member.user.tag, user.lifeExp]);
				}
			}
		}
		let sort = xpArr.sort((a, b) => b[1] - a[1]);

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
