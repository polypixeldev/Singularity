import Discord from "discord.js";

import loadUserInfo from "../util/loadUserInfo.js";
import BaseEmbed from "../util/BaseEmbed.js";

import Command from "../interfaces/client/command.js";

export default {
	name: "infractions",
	description: "Displays the infractions for the specified user",
	type: "mod",
	options: [
		{
			name: "user",
			description: "The user you wish to view",
			type: "USER",
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

		if (user.member.permissions.has("ADMINISTRATOR")) {
			const permsEmbed = new Discord.MessageEmbed()
				.setDescription("Moderators cannot have infractions!")
				.setColor(0x000000);
			return interaction.editReply({ embeds: [permsEmbed] });
		}

		if (!interaction.member.permissions.has("BAN_MEMBERS")) {
			const permsEmbed = new Discord.MessageEmbed()
				.setDescription("You do not have permission to view infractions!")
				.setColor(0x000000);
			return interaction.editReply({ embeds: [permsEmbed] });
		}

		const userDoc = await loadUserInfo(client, serverDoc, user.user.id);

		const embed = new BaseEmbed(
			`Infractions for ${user.user.tag}`,
			interaction.user
		);

		if (userDoc.infractions.length > 0) {
			for (const infraction of userDoc.infractions) {
				const timestamp = new Date(infraction.timestamp);
				embed.addField(
					`**${timestamp.getUTCMonth()}/${timestamp.getUTCDate()}/${timestamp.getUTCFullYear()}** - ${
						infraction.type
					} from ${infraction.modTag}`,
					infraction.message,
					false
				);
			}
		} else {
			embed.setDescription("The specified user has no infractions!");
		}

		interaction.editReply({ embeds: [embed] });
	},
} as Command;
