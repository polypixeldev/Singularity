module.exports = {
	name: "info",
	description: "Information on My Singularity Explore",
	options: [],
	example: "ms explore info",
	async slashExecute(client, Discord, interaction) {
		await interaction.deferReply({ ephemeral: true });

		const embed = new client.utils.BaseEmbed(
			"My Singularity Explore Info",
			interaction.user
		)
			.setDescription(
				"***My Singularity Explore is a way to earn rewards and learn something new along the way!***"
			)
			.addFields([
				{
					name: "What is My Singularity Explore?",
					value: `
					My Singularity Explore is a way of earning rewards through learning. Every week, you have a chance to complete a small activity on a topic of your choice. If you complete an activity before the end of the week, you will receive a base set of rewards and be entered in a raffle to win more!
				`,
					inline: false,
				},
			]);

		return interaction.editReply({ embeds: [embed] });
	},
};
