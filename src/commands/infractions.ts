import Discord from "discord.js";

import loadUserInfo from "../util/loadUserInfo.js";
import BaseEmbed from "../util/BaseEmbed.js";

import type Command from "../interfaces/client/Command.js";

export default {
	name: "infractions",
	description: "Displays the infractions for the specified user",
	type: Discord.ApplicationCommandType.ChatInput,
	category: "mod",
	options: [
		{
			name: "user",
			description: "The user you wish to view",
			type: Discord.ApplicationCommandOptionType.User,
			required: true,
		},
	],
	example: "infractions @user",
	async slashExecute(client, interaction, serverDoc) {
		await interaction.deferReply({ ephemeral: true });

		const user = interaction.options.get("user");

		if (
			!(user?.member instanceof Discord.GuildMember) ||
			!(interaction.member instanceof Discord.GuildMember) ||
			!user.user
		) {
			return;
		}

		if (
			user.member.permissions.has(Discord.PermissionFlagsBits.Administrator)
		) {
			const permsEmbed = new Discord.EmbedBuilder()
				.setDescription("Moderators cannot have infractions!")
				.setColor(0x000000);
			return interaction.editReply({ embeds: [permsEmbed] });
		}

		if (
			!interaction.member.permissions.has(
				Discord.PermissionFlagsBits.ModerateMembers,
			)
		) {
			const permsEmbed = new Discord.EmbedBuilder()
				.setDescription("You do not have permission to view infractions!")
				.setColor(0x000000);
			return interaction.editReply({ embeds: [permsEmbed] });
		}

		const userDoc = await loadUserInfo(client, serverDoc, user.user.id);

		const embed = new BaseEmbed(
			`Infractions for ${user.user.tag}`,
			interaction.user,
		);

		if (userDoc.infractions.length > 0) {
			for (const infraction of userDoc.infractions) {
				const timestamp = new Date(infraction.timestamp);
				embed.addFields({
					name: `**${timestamp.getUTCMonth()}/${timestamp.getUTCDate()}/${timestamp.getUTCFullYear()}** - ${
						infraction.type
					} from ${infraction.modTag}`,
					value: infraction.message,
					inline: false,
				});
			}
		} else {
			embed.setDescription("The specified user has no infractions!");
		}

		interaction.editReply({ embeds: [embed] });
	},
} as Command;
