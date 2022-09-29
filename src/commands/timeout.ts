import Discord from "discord.js";

import loadUserInfo from "../util/loadUserInfo.js";
import updateUser from "../util/updateUser.js";

import type Command from "../interfaces/client/Command.js";

export default {
	name: "timeout",
	description: "Timeout a user for a specified amount of time",
	defaultPermission: true,
	options: [
		{
			name: "user",
			description: "The user to timeout",
			type: Discord.ApplicationCommandOptionType.User,
			required: true,
		},
		{
			name: "time",
			description: "The time in minutes to timeout the user",
			type: Discord.ApplicationCommandOptionType.Integer,
			required: true,
		},
		{
			name: "reason",
			description:
				'A short reason for timing out this user - will default to "Timed out by <your tag>" if omitted',
			type: Discord.ApplicationCommandOptionType.String,
		},
	],
	type: Discord.ApplicationCommandType.ChatInput,
	category: "mod",
	example: "timeout @poly 5",
	async slashExecute(client, interaction, serverDoc) {
		await interaction.deferReply();
		const user = interaction.options.get("user");
		const reason = interaction.options.get("reason");

		if (
			!(user?.member instanceof Discord.GuildMember) ||
			!(interaction.member instanceof Discord.GuildMember) ||
			!user?.user
		) {
			return;
		}

		if (
			user.member.permissions.has(Discord.PermissionFlagsBits.Administrator)
		) {
			const permsEmbed = new Discord.EmbedBuilder()
				.setDescription("You cannot timeout a moderator!")
				.setColor(0x000000);
			return interaction.editReply({ embeds: [permsEmbed] });
		}

		if (
			!interaction.member.permissions.has(
				Discord.PermissionFlagsBits.ModerateMembers
			) &&
			!interaction.member.permissions.has(
				Discord.PermissionFlagsBits.Administrator
			)
		) {
			const permsEmbed = new Discord.EmbedBuilder()
				.setDescription("You do not have permissions to timeout!")
				.setColor(0x000000);

			return interaction.editReply({ embeds: [permsEmbed] });
		}

		if (!interaction.guild) {
			return;
		}

		const kickedEmbed = new Discord.EmbedBuilder()
			.setColor(0x000000)
			.setDescription(
				`You have been timed out in **${interaction.guild.name}** for ${
					interaction.options.get("time")?.value
				} minutes for the following reason: \`${
					interaction.options.get("reason")?.value ??
					`User timed out by ${interaction.user.tag}`
				}\``
			);

		user.user.send({ embeds: [kickedEmbed] });

		user.member
			.timeout(
				Number(interaction.options.get("time")?.value) * 60 * 1000,
				(reason?.value ?? `User timed out by ${interaction.user.tag}`) as string
			)
			.then(async () => {
				if (!user.user) {
					return;
				}

				const userDoc = await loadUserInfo(client, serverDoc, user.user.id);
				userDoc.infractions.push({
					modID: interaction.user.id,
					modTag: interaction.user.tag,
					timestamp: interaction.createdTimestamp,
					type: "Timeout",
					message: (interaction.options.get("reason")?.value ??
						`User timed out by ${interaction.user.tag} for ${
							interaction.options.get("time")?.value
						} minutes`) as string,
				});

				updateUser(client, userDoc.guildID, userDoc.userID, {
					...userDoc.toObject(),
					infractions: userDoc.infractions,
				});
				const successEmbed = new Discord.EmbedBuilder()
					.setDescription(`Successfully timed out **${user.user.tag}**`)
					.setColor(0x000000);

				interaction.editReply({ embeds: [successEmbed] });
			})
			.catch((err) => {
				if (err.message === "Missing Permissions") {
					const embed = new Discord.EmbedBuilder()
						.setColor(0x000000)
						.setDescription("I don't have permissions to time out this user!");

					return interaction.editReply({ embeds: [embed] });
				}
				const errEmbed = new Discord.EmbedBuilder()
					.setColor(0x000000)
					.setDescription(
						"I was unable to time out the member because: \n`" + err + "`"
					);
				interaction.editReply({ embeds: [errEmbed] });

				console.error(err);
			});
	},
} as Command;
