export default {
	name: "unmute",
	description: "Unmutes the mentioned user",
	defaultPermission: true,
	options: [
		{
			name: "user",
			description: "The user you want to unmute",
			type: "USER",
			required: true,
		},
		{
			name: "reason",
			description:
				'The reason for unmuting this user - defaults to "Unmuted by <your tag>" if omitted',
			type: "STRING",
			required: false,
		},
	],
	type: "mod",
	args: ["<user to unmute>"],
	aliases: [],
	example: "unmute @poly",
	notes: "user must be mentioned",
	async slashExecute(client, Discord, interaction) {
		await interaction.deferReply();
		let user = interaction.options.get("user").user;

		const member = interaction.guild.members.resolve(user);

		if (!member.roles.cache.find((role) => role.name === "Muted")) {
			const embed = new Discord.MessageEmbed()
				.setDescription("This member is not muted!")
				.setColor(0x000000);

			return interaction.editReply({ embeds: [embed] });
		}

		const unmuter = interaction.member;
		if (!unmuter.permissions.has("MUTE_MEMBERS")) {
			const permsEmbed = new Discord.MessageEmbed()
				.setDescription("You do not have permission to unmute!")
				.setColor(0x000000);
			return interaction.editReply({ embeds: [permsEmbed] });
		}
		const unmuteRole = interaction.guild.roles.cache.find(
			(role) => role.name === "Muted"
		);
		member.roles
			.remove(
				unmuteRole,
				interaction.options.get("reason")?.value ??
					`User unmuted by ${interaction.user.tag}`
			)
			.then(() => {
				const embed = new Discord.MessageEmbed()
					.setColor(0x000000)
					.setDescription(`Successfully unmuted **${user.tag}**`);

				interaction.editReply({ embeds: [embed] });
			})
			.catch((err) => {
				const embed = new Discord.MessageEmbed()
					.setColor(0x000000)
					.setDescription(
						"I was unable to unmute the member because: \n`" + err + "`"
					);

				interaction.editReply({ embeds: [embed] });
				console.error(err);
			});
	},
};
