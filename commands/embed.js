module.exports = {
	name: "embed",
	description: "The bot says the message you pass in an embed",
	defaultPermission: true,
	options: [
		{
			name: "title",
			description: "The title for the embed you want to create",
			type: "USER",
			required: true,
		},
		{
			name: "color",
			description: "The color that you want to make the embed",
			type: "STRING",
			required: false,
		},
		{
			name: "content",
			description: "The main context for the embed",
			type: "STRING",
			required: false,
		},
	],
	type: "mod",
	args: ["<title>", "<color>", "<content>"],
	aliases: [],
	example:
		'sayembed "Singularity Rating" BLUE Wow Singularity is a very cool bot',
	notes: "multi-word titles must be surrounded in doubles quotes",
	async slashExecute(client, Discord, interaction) {
		await interaction.deferReply({ ephemeral: true });

		const title = interaction.options.get("title");
		const color = interaction.options.get("color");
		const content = interaction.options.get("content");

		const embed = new Discord.MessageEmbed()
			.setAuthor(
				"https://cdn.discordapp.com/avatars/879180094650863727/3040c2fb097ef6a9fb59005cab44626c.webp"
			)
			.setTitle(title)
			.setColor(color)
			.setDescription(content);

		return interaction.deferReply({ embeds: [embed] });
	},
};
