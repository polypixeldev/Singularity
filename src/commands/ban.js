export default {
	name: "ban",
	description: "Bans the mentioned user",
	defaultPermission: true,
	options: [
		{
			type: "USER",
			name: "user",
			description: "The user you want to ban",
			required: true,
		},
		{
			type: "INTEGER",
			name: "days",
			description: "The number of days you want to ban the user, up to 7",
			required: false,
			choices: [
				{
					name: "1 Day",
					value: 1,
				},
				{
					name: "2 Days",
					value: 2,
				},
				{
					name: "3 Days",
					value: 3,
				},
				{
					name: "4 Days",
					value: 4,
				},
				{
					name: "5 Days",
					value: 5,
				},
				{
					name: "6 Days",
					value: 6,
				},
				{
					name: "7 Days",
					value: 7,
				},
			],
		},
		{
			type: "STRING",
			name: "reason",
			description:
				'A short reason for banning this user - will default to "Banned by <your tag>" if omitted',
			required: false,
		},
	],
	type: "mod",
	args: ["<user to ban>", "!<number of days>", "reason"],
	aliases: ["tempban"],
	example: "ban @poly 14 Breaking the rules",
	notes:
		"number of days cannot be longer than 7 - if days are omitted, mentioned user will be banned indefinitely",
	async slashExecute(client, Discord, interaction, serverDoc) {
		await interaction.deferReply();
		let user = interaction.options.get("user");

		if (user.member.permissions.has("ADMINISTRATOR")) {
			const permsEmbed = new Discord.MessageEmbed()
				.setDescription("You cannot ban a moderator!")
				.setColor(0x000000);
			return interaction.editReply({ embeds: [permsEmbed] });
		}

		if (!interaction.member.permissions.has("BAN_MEMBERS")) {
			const permsEmbed = new Discord.MessageEmbed()
				.setDescription("You do not have permission to ban!")
				.setColor(0x000000);
			return interaction.editReply({ embeds: [permsEmbed] });
		}

		const bannedEmbed = new Discord.MessageEmbed()
			.setColor(0x000000)
			.setDescription(
				`You have been banned from **${interaction.guild.name}** for \`${
					interaction.options.get("reason")?.value ??
					`User banned by ${interaction.user.tag}`
				}\``
			);

		await user.user.send({ embeds: [bannedEmbed] });

		return user.member
			.ban({
				reason:
					interaction.options.get("reason")?.value ??
					`User banned by ${interaction.user.tag}`,
				days: interaction.options.get("days")?.value,
			})
			.then(async () => {
				const userDoc = await client.utils.loadUserInfo(
					client,
					serverDoc,
					user.user.id
				);
				userDoc.infractions.push({
					modID: interaction.user.id,
					modTag: interaction.user.tag,
					timestamp: interaction.createdTimestamp,
					type: "Ban",
					message:
						interaction.options.get("reason")?.value ??
						`User banned by ${interaction.user.tag}`,
				});
				client.utils.updateUser(client, userDoc.guildID, userDoc.userID, {
					...userDoc.toObject(),
					infractions: userDoc.infractions,
				});

				const embed = new Discord.MessageEmbed()
					.setColor(0x000000)
					.setDescription(`Successfully banned **${user.user.tag}**`);
				return interaction.editReply({ embeds: [embed] });
			})
			.catch((err) => {
				if (err.message === "Missing Permissions") {
					const embed = new Discord.MessageEmbed()
						.setColor(0x000000)
						.setDescription("I do not have permissions to ban this user!");

					return interaction.editReply({ embeds: [embed] });
				}

				const embed = new Discord.MessageEmbed()
					.setColor(0x000000)
					.setDescription(
						`I was unable to ban the member because: \n \`\`\`${err}\`\`\``
					);
				return interaction.editReply({ embeds: [embed] });
			});
	},
};
