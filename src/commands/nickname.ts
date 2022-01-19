import Discord from "discord.js";

import Command from "../interfaces/client/command";

export default {
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
	async slashExecute(client, interaction) {
		await interaction.deferReply({ ephemeral: true });

		if (!(interaction.member instanceof Discord.GuildMember)) {
			return;
		}

		if (!interaction.member.permissions.has("ADMINISTRATOR")) {
			const embed = new Discord.MessageEmbed()
				.setColor(0x000000)
				.setDescription(
					"You do not have permission to set the nickname of others!"
				);

			return interaction.editReply({ embeds: [embed] });
		}

		const user = interaction.options.get("user")?.user;

		const member = interaction.options.get("user")?.member;

		if (!(member instanceof Discord.GuildMember) || !user) {
			return;
		}

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
			.setNickname(
				interaction.options.get("nickname")?.value
					? (interaction.options.get("nickname")?.value as string)
					: null
			)
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
} as Command;
