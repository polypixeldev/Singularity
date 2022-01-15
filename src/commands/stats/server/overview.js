module.exports = {
	name: "overview",
	description: "An overview of the current server's statistics",
	options: [],
	async slashExecute(client, Discord, interaction) {
		await interaction.deferReply({ ephemeral: true });

		const embed = new client.utils.BaseEmbed(
			`${interaction.guild.name} - Server Stats`,
			interaction.user
		)
			.setDescription("Various statistics about this server")
			.setThumbnail(interaction.guild.iconURL())
			.addFields([
				{
					name: "Member Count",
					value: `\`${interaction.guild.members.cache.size}\``,
					inline: true,
				},
				{
					name: "Role Count",
					value: `\`${interaction.guild.roles.cache.size}\``,
					inline: true,
				},
				{
					name: "Owner",
					value: `\`${
						interaction.guild.members.resolve(interaction.guild.ownerId).user
							.tag
					}\``,
					inline: true,
				},
				{
					name: "Channel Count",
					value: `\`${interaction.guild.channels.cache.size}\``,
					inline: true,
				},
				{
					name: "ID",
					value: `\`${interaction.guild.id}\``,
					inline: true,
				},
				{
					name: "Date Created",
					value: `\`${interaction.guild.createdAt.getMonth()}/${interaction.guild.createdAt.getDate()}/${interaction.guild.createdAt.getFullYear()}\``,
					inline: true,
				},
			]);

		interaction.editReply({ embeds: [embed] });
	},
};
