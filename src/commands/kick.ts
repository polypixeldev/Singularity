import Discord from "discord.js";

import loadUserInfo from "../util/loadUserInfo";
import updateUser from "../util/updateUser";

import Command from "../interfaces/client/command";

export default {
	name: "kick",
	description: "Kicks the mentioned user",
	defaultPermission: true,
	options: [
		{
			name: "user",
			type: "USER",
			description: "The user you want to kick",
			required: true,
		},
		{
			name: "reason",
			type: "STRING",
			description:
				'A short reason for kicking this user - will default to "Kicked by <your tag>" if omitted',
		},
	],
	type: "mod",
	args: ["<user to kick>", "!<reason>"],
	aliases: [],
	example: "kick @poly spamming",
	notes: "user must be a mention",
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

		if (user.member.permissions.has("ADMINISTRATOR")) {
			const permsEmbed = new Discord.MessageEmbed()
				.setDescription("You cannot kick a moderator!")
				.setColor(0x000000);
			return interaction.editReply({ embeds: [permsEmbed] });
		}

		if (
			!interaction.member.permissions.has("KICK_MEMBERS") &&
			!interaction.member.permissions.has("ADMINISTRATOR")
		) {
			const permsEmbed = new Discord.MessageEmbed()
				.setDescription("You do not have permissions to kick!")
				.setColor(0x000000);

			return interaction.editReply({ embeds: [permsEmbed] });
		}

		if (!interaction.guild) {
			return;
		}

		const kickedEmbed = new Discord.MessageEmbed()
			.setColor(0x000000)
			.setDescription(
				`You have been kicked from **${interaction.guild.name}** for \`${
					interaction.options.get("reason")?.value ??
					`User banned by ${interaction.user.tag}`
				}\``
			);

		user.user.send({ embeds: [kickedEmbed] });

		user.member
			.kick(
				(reason?.value ?? `User kicked by ${interaction.user.tag}`) as string
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
					type: "Kick",
					message: (interaction.options.get("reason")?.value ??
						`User kicked by ${interaction.user.tag}`) as string,
				});

				updateUser(client, userDoc.guildID, userDoc.userID, {
					...userDoc.toObject(),
					infractions: userDoc.infractions,
				});
				const successEmbed = new Discord.MessageEmbed()
					.setDescription(`Successfully kicked **${user.user.tag}**`)
					.setColor(0x000000);

				interaction.editReply({ embeds: [successEmbed] });
			})
			.catch((err) => {
				if (err.message === "Missing Permissions") {
					const embed = new Discord.MessageEmbed()
						.setColor(0x000000)
						.setDescription("I don't have permissions to kick this user!");

					return interaction.editReply({ embeds: [embed] });
				}
				const errEmbed = new Discord.MessageEmbed()
					.setColor(0x000000)
					.setDescription(
						"I was unable to kick the member because: \n`" + err + "`"
					);
				interaction.editReply({ embeds: [errEmbed] });

				console.error(err);
			});
	},
} as Command;
