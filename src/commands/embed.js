module.exports = {
	name: "embed",
	description: "The bot says the message you pass in an embed",
	defaultPermission: true,
	options: [
		{
			name: "title",
			description: "The title for the embed you want to create",
			type: "STRING",
			required: true,
		},
		{
			name: "color",
			description: "The color that you want to make the embed",
			type: "STRING",
			required: true,
		},
		{
			name: "content",
			description: "The main context for the embed",
			type: "STRING",
			required: true,
		},
	],
	type: "mod",
	args: ["<title>", "<color>", "<content>"],
	aliases: [],
	example:
		'sayembed "Singularity Rating" BLUE Wow Singularity is a very cool bot',
	notes: "multi-word titles must be surrounded in doubles quotes",
	async slashExecute(client, Discord, interaction) {
		await interaction.deferReply({ ephemeral: false });

		const title = interaction.options.get("title").value;
		const color = interaction.options.get("color").value;
		const content = interaction.options.get("content").value;

		const embed = new Discord.MessageEmbed()
			.setTitle(title)
			.setDescription(content);

		try {
			embed.setColor(color);
		} catch (err) {
			const errorEmbed = new Discord.MessageEmbed()
				.setColor(0x000000)
				.setDescription("This color doesnt exist, please enter another color!");

			return interaction.editReply({ embeds: [errorEmbed] });
		}

		return interaction.editReply({ embeds: [embed] });
	},
};
