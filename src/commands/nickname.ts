import Discord from "discord.js";

import type Command from "../interfaces/client/Command.js";

export default {
	name: "nickname",
	description: "Sets the mentioned user's nickname to the specified nickname",
	defaultPermission: true,
	options: [
		{
			name: "user",
			description: "The user you want to nickname",
			type: Discord.ApplicationCommandOptionType.User,
			required: true,
		},
		{
			name: "nickname",
			description:
				"The new nickname for the user - leave blank to get rid of a nickname",
			type: Discord.ApplicationCommandOptionType.String,
			required: false,
		},
	],
	type: Discord.ApplicationCommandType.ChatInput,
	category: "mod",
	args: ["<target user>", "<new nickname>"],
	aliases: [],
	example: "nickname @poly Bot Maker",
	notes: "user must be mentioned",
	async slashExecute(client, interaction) {
		await interaction.deferReply({ ephemeral: true });

		if (!(interaction.member instanceof Discord.GuildMember)) {
			return;
		}

		if (
			!interaction.member.permissions.has(
				Discord.PermissionFlagsBits.Administrator
			)
		) {
			const embed = new Discord.EmbedBuilder()
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
			member.permissions.has(Discord.PermissionFlagsBits.Administrator) &&
			user.id !== "860552124064202812"
		) {
			const permsEmbed = new Discord.EmbedBuilder()
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
				const embed = new Discord.EmbedBuilder()
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
					const errPermsEmbed = new Discord.EmbedBuilder()
						.setDescription(
							"Uh oh! I don't have permission to nickname this user!"
						)
						.setColor(0x000000);

					return interaction.editReply({ embeds: [errPermsEmbed] });
				} else {
					const errEmbed = new Discord.EmbedBuilder()
						.setColor(0x000000)
						.setDescription(
							`I was unable to change the member's nickname because: \n \`${err}\``
						);

					return interaction.editReply({ embeds: [errEmbed] });
				}
			});
	},
} as Command;
