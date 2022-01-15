export default {
	name: "mysingularity",
	description: "My Singularity statistics for this server",
	options: [],
	async slashExecute(client, Discord, interaction, serverDoc) {
		await interaction.deferReply({ ephemeral: true });

		await serverDoc.populate("ms");

		let totalProtons = serverDoc.ms.reduce((acc, val) => acc + val.protons, 0);

		let totalElectrons = serverDoc.ms.reduce(
			(acc, val) => acc + val.electrons,
			0
		);

		let totalDarkMatter = serverDoc.ms.reduce(
			(acc, val) => acc + val.darkMatter,
			0
		);

		const embed = new client.utils.BaseEmbed(
			`${interaction.guild.name} - My Singularity Stats`,
			interaction.user
		)
			.setDescription("My Singularity statistics for this server")
			.setThumbnail(interaction.guild.iconURL())
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
};
