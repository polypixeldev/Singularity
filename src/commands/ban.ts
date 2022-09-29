import Discord from "discord.js";

import loadUserInfo from "../util/loadUserInfo.js";
import updateUser from "../util/updateUser.js";

import type Command from "../interfaces/client/Command.js";

export default {
	name: "ban",
	description: "Bans the mentioned user",
	defaultPermission: true,
	options: [
		{
			type: Discord.ApplicationCommandOptionType.User,
			name: "user",
			description: "The user you want to ban",
			required: true,
		},
		{
			type: Discord.ApplicationCommandOptionType.Integer,
			name: "days",
			description: "Number of days of messages by the user to delete",
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
			type: Discord.ApplicationCommandOptionType.String,
			name: "reason",
			description:
				'A short reason for banning this user - will default to "Banned by <your tag>" if omitted',
			required: false,
		},
	],
	type: Discord.ApplicationCommandType.ChatInput,
	category: "mod",
	args: ["<user to ban>", "!<number of days>", "reason"],
	aliases: ["tempban"],
	example: "ban @poly 14 Breaking the rules",
	async slashExecute(client, interaction, serverDoc) {
		await interaction.deferReply();
		const user = interaction.options.get("user");

		if (!(user?.member instanceof Discord.GuildMember)) {
			return;
		}

		if (!user.user) {
			return;
		}

		if (!(interaction.member instanceof Discord.GuildMember)) {
			return;
		}

		if (!interaction.guild) {
			return;
		}

		if (
			user.member.permissions.has(Discord.PermissionFlagsBits.Administrator)
		) {
			const permsEmbed = new Discord.EmbedBuilder()
				.setDescription("You cannot ban a moderator!")
				.setColor(0x000000);
			return interaction.editReply({ embeds: [permsEmbed] });
		}

		if (
			!interaction.member.permissions.has(
				Discord.PermissionFlagsBits.BanMembers
			)
		) {
			const permsEmbed = new Discord.EmbedBuilder()
				.setDescription("You do not have permission to ban!")
				.setColor(0x000000);
			return interaction.editReply({ embeds: [permsEmbed] });
		}

		const bannedEmbed = new Discord.EmbedBuilder()
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
					(interaction.options.get("reason")?.value as string) ??
					`User banned by ${interaction.user.tag}`,
				deleteMessageDays: Number(interaction.options.get("days")?.value),
			})
			.then(async () => {
				if (!user.user) {
					return;
				}

				const userDoc = await loadUserInfo(client, serverDoc, user.user.id);

				userDoc.infractions.push({
					modID: interaction.user.id,
					modTag: interaction.user.tag,
					timestamp: interaction.createdTimestamp,
					type: "Ban",
					message:
						(interaction.options.get("reason")?.value as string) ??
						`User banned by ${interaction.user.tag}`,
				});

				updateUser(client, userDoc.guildID, userDoc.userID, {
					...userDoc.toObject(),
					infractions: userDoc.infractions,
				});

				const embed = new Discord.EmbedBuilder()
					.setColor(0x000000)
					.setDescription(`Successfully banned **${user.user.tag}**`);
				return interaction.editReply({ embeds: [embed] });
			})
			.catch((err) => {
				if (err.message === "Missing Permissions") {
					const embed = new Discord.EmbedBuilder()
						.setColor(0x000000)
						.setDescription("I do not have permissions to ban this user!");

					return interaction.editReply({ embeds: [embed] });
				}

				const embed = new Discord.EmbedBuilder()
					.setColor(0x000000)
					.setDescription(
						`I was unable to ban the member because: \n \`\`\`${err}\`\`\``
					);
				return interaction.editReply({ embeds: [embed] });
			});
	},
} as Command;
