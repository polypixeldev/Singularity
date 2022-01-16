export default {
	name: "warn",
	description: "Warn the specified user for the specified reason",
	type: "mod",
	options: [
		{
			name: "user",
			type: "USER",
			description: "The user you wish to warn",
			required: true,
		},
		{
			name: "warning",
			type: "STRING",
			description:
				'The message to warn the user for - defaults to "warned by <your tag>"',
			required: false,
		},
	],
	example: "warn @user spam",
	async slashExecute(client, Discord, interaction, serverDoc) {
		await interaction.deferReply();

		const user = interaction.options.get("user");

		if (user.member.permissions.has("ADMINISTRATOR")) {
			const permsEmbed = new Discord.MessageEmbed()
				.setDescription("You cannot warn a moderator!")
				.setColor(0x000000);
			return interaction.editReply({ embeds: [permsEmbed] });
		}

		if (!interaction.member.permissions.has("BAN_MEMBERS")) {
			const permsEmbed = new Discord.MessageEmbed()
				.setDescription("You do not have permission to warn!")
				.setColor(0x000000);
			return interaction.editReply({ embeds: [permsEmbed] });
		}

		const userDoc = await client.utils.loadUserInfo(
			client,
			serverDoc,
			user.user.id
		);
		userDoc.infractions.push({
			modID: interaction.user.id,
			modTag: interaction.user.tag,
			type: "Warning",
			timestamp: interaction.createdTimestamp,
			message:
				interaction.options.get("warning")?.value ??
				`User warned by ${interaction.user.tag}`,
		});
		client.utils.updateUser(client, serverDoc.guildID, userDoc.userID, {
			...userDoc.toObject(),
			infractions: userDoc.infractions,
		});

		const warnedEmbed = new Discord.MessageEmbed()
			.setColor(0x000000)
			.setDescription(
				`You have been warned in **${interaction.guild.name}** for \`${
					interaction.options.get("reason")?.value ??
					`User banned by ${interaction.user.tag}`
				}\``
			);

		user.user.send({ embeds: [warnedEmbed] });

		const embed = new Discord.MessageEmbed()
			.setColor(0x000000)
			.setDescription(
				`Successfully warned \`${user.user.tag}\` for \`${
					interaction.options.get("warning")?.value ??
					`User warned by ${interaction.user.tag}`
				}\``
			);

		interaction.editReply({ embeds: [embed] });
	},
};
