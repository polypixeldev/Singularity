module.exports = {
	name: "prefix",
	description: "Sets the prefix of the bot",
	type: "mod",
	options: [
		{
			name: "prefix",
			description: "The new prefix",
			type: "STRING",
			required: true,
		},
	],
	args: ["<new prefix>"],
	aliases: [],
	example: "prefix ?",
	async slashExecute(client, Discord, interaction) {
		await interaction.deferReply({ ephemeral: true });
		if (interaction.member.permissions.has("MANAGE_GUILD")) {
			client.utils
				.updateServer(client, interaction.guild.id, {
					prefix: interaction.options.get("prefix").value,
				})
				.then(() => {
					const embed = new Discord.MessageEmbed()
						.setColor(0x000000)
						.setDescription(
							`Prefix set to: \`${interaction.options.get("prefix").value}\``
						);

					interaction.editReply({ embeds: [embed] });
				});
		} else {
			const permsEmbed = new Discord.MessageEmbed()
				.setDescription("You do not have permissions to change my prefix!")
				.setColor(0x000000);

			interaction.editReply({ embeds: [permsEmbed] });
		}
	},
};
