module.exports = {
	name: "nickname",
	description: "Sets the mentioned user's nickname to the specified nickname",
	defaultPermission: true,
	options: [
		{
			name: "user",
			description: "The user you want to nickname",
			type: "USER",
			required: true,
		},
		{
			name: "nickname",
			description:
				"The new nickname for the user - leave blank to get rid of a nickname",
			type: "STRING",
			required: false,
		},
	],
	type: "mod",
	args: ["<target user>", "<new nickname>"],
	aliases: [],
	example: "nickname @poly Bot Maker",
	notes: "user must be mentioned",
	execute(client, Discord, msg, args) {
		if (!msg.member.permissions.has("ADMINISTRATOR")) {
			const embed = new Discord.MessageEmbed()
				.setColor(0x000000)
				.setDescription(
					"You do not have permission to set the nickname of others!"
				);

			return msg.channel.send({ embeds: [embed] });
		}
		if (!args[1]) args[1] === null;

		let user = msg.mentions.users.first();

		if (!user) {
			user = client.utils.resolveTag(msg.guild, args[0]);
			if (!user) {
				user = client.user;
				args[1] = args[0];
			}
		}

		const member = msg.guild.members.resolve(user);

		if (
			member.permissions.has("ADMINISTRATOR") &&
			user.id !== "860552124064202812"
		) {
			const permsEmbed = new Discord.MessageEmbed()
				.setDescription("You cannot nickname a moderator!")
				.setColor(0x000000);

			return msg.channel.send({ embeds: [permsEmbed] });
		}

		const prevName = member.nickname;

		const nicknameFunc = (args) => {
			args.shift();
			return args;
		};
		const nicknameSet = nicknameFunc(args);

		member
			.setNickname(nicknameSet.join(" "))
			.then(() => {
				const embed = new Discord.MessageEmbed()
					.setColor(0x000000)
					.setDescription(
						`Name changed from \`${
							prevName === null || prevName === "" ? "None" : prevName
						}\` to \`${
							nicknameSet.join(" ") === null || nicknameSet.join(" ") === ""
								? "None"
								: nicknameSet.join(" ")
						}\``
					);

				msg.channel.send({ embeds: [embed] });
			})
			.catch(async (err) => {
				if (err == "DiscordAPIError: Missing Permissions") {
					const errPermsEmbed = new Discord.MessageEmbed()
						.setDescription(
							"Uh oh! I don't have permission to nickname this user!"
						)
						.setColor(0x000000);

					return msg.channel.send({ embeds: [errPermsEmbed] });
				} else {
					const errEmbed = new Discord.MessageEmbed()
						.setColor(0x000000)
						.setDescription(
							`I was unable to change the member's nickname because: \n \`${err}\``
						);

					return msg.channel.send({ embeds: [errEmbed] });
				}
			});
	},
	async slashExecute(client, Discord, interaction) {
		await interaction.deferReply({ ephemeral: true });
		if (!interaction.member.permissions.has("ADMINISTRATOR")) {
			const embed = new Discord.MessageEmbed()
				.setColor(0x000000)
				.setDescription(
					"You do not have permission to set the nickname of others!"
				);

			return interaction.editReply({ embeds: [embed] });
		}

		let user = interaction.options.get("user").user;

		const member = interaction.options.get("user").member;

		if (
			member.permissions.has("ADMINISTRATOR") &&
			user.id !== "860552124064202812"
		) {
			const permsEmbed = new Discord.MessageEmbed()
				.setDescription("You cannot nickname a moderator!")
				.setColor(0x000000);

			return interaction.editReply({ embeds: [permsEmbed] });
		}

		const prevName = member.nickname;

		member
			.setNickname(interaction.options.get("nickname") ?? null)
			.then(() => {
				const embed = new Discord.MessageEmbed()
					.setColor(0x000000)
					.setDescription(
						`Name changed from \`${
							prevName === null || prevName === "" ? "None" : prevName
						}\` to \`${interaction.options.get("nickname")?.value ?? "None"}\``
					);

				interaction.editReply({ embeds: [embed] });
			})
			.catch(async (err) => {
				if (err == "DiscordAPIError: Missing Permissions") {
					const errPermsEmbed = new Discord.MessageEmbed()
						.setDescription(
							"Uh oh! I don't have permission to nickname this user!"
						)
						.setColor(0x000000);

					return interaction.editReply({ embeds: [errPermsEmbed] });
				} else {
					const errEmbed = new Discord.MessageEmbed()
						.setColor(0x000000)
						.setDescription(
							`I was unable to change the member's nickname because: \n \`${err}\``
						);

					return interaction.editReply({ embeds: [errEmbed] });
				}
			});
	},
};
