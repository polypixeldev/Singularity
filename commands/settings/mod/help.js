module.exports = {
	name: "help",
	description: "Singularity Moderation Settings",
	type: "mod",
	options: [],
	args: [],
	aliases: [],
	example: "settings mod",
	execute(client, Discord, msg, args) {
		if (args[1] === "") {
			//eslint-disable-line
		} else {
			let currentDate = new Date(Date.now());
			const embed = new Discord.MessageEmbed()
				.setColor(0x000000)
				.setTitle(`Singularity Mod Settings - ${msg.guild.name}`)
				.setDescription(
					`
	
			`
				)
				.setFooter(
					`Singularity Mod Settings requested by ${
						msg.author.tag
					}  • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`,
					msg.author.displayAvatarURL()
				);

			return msg.channel.send({ embeds: [embed] });
		}
	},
	async slashExecute(client, Discord, interaction) {
		await interaction.deferReply({ ephemeral: true });
		if (interaction.options.getSubcommand(false) === "") {
			//eslint-disable-line
		} else {
			const embed = new client.utils.BaseEmbed(
				`Singularity Mod Settings - ${interaction.guild.name}`,
				interaction.user
			).setDescription(
				`
	
			`
			);

			return interaction.editReply({ embeds: [embed] });
		}
	},
};
