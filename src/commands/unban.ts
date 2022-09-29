import Discord from "discord.js";

import BaseEmbed from "../util/BaseEmbed.js";

import type Command from "../interfaces/client/Command.js";

export default {
	name: "unban",
	description: "Unbans the tagged user",
	defaultPermission: true,
	options: [
		{
			name: "tag",
			description:
				'The tag of the user you want to unban, or "list" to see a list of banned users',
			type: Discord.ApplicationCommandOptionType.String,
			required: false,
		},
		{
			name: "id",
			description:
				"If provided, the user matching the id will be unbanned instead of by user tag",
			type: Discord.ApplicationCommandOptionType.String,
			required: false,
		},
		{
			name: "reason",
			description: `The reason for unbanning this user - defaults to "Unbanned by <your tag>" if omitted}`,
			type: Discord.ApplicationCommandOptionType.String,
			required: false,
		},
	],
	type: Discord.ApplicationCommandType.ChatInput,
	category: "mod",
	args: ["<user#tag to unban>", "!<reason>"],
	aliases: [],
	example: "unban @poly not spamming",
	notes: "user must be tagged in form user#tag",
	async slashExecute(client, interaction) {
		await interaction.deferReply({ ephemeral: true });

		if (
			!interaction.guild ||
			!(interaction.member instanceof Discord.GuildMember)
		) {
			return;
		}

		if (!interaction.options.get("tag") && !interaction.options.get("id")) {
			const embed = new Discord.EmbedBuilder()
				.setColor(0x000000)
				.setDescription("You must provide either a user tag or a user id!");

			return interaction.editReply({ embeds: [embed] });
		}
		const bans = await interaction.guild.bans.fetch();
		if (interaction.options.get("tag")?.value === "list") {
			if (
				!interaction.member.permissions.has(
					Discord.PermissionFlagsBits.BanMembers
				)
			) {
				const embed = new Discord.EmbedBuilder()
					.setColor(0x000000)
					.setDescription("You do not have permission to view the ban list!");

				return interaction.editReply({ embeds: [embed] });
			}
			const banArr = bans.map((banInfo) => banInfo.user.tag);
			let banListStr = "";

			for (const ban of banArr) {
				banListStr = banListStr + ` **- ${ban}** \n`;
			}

			if (banListStr === "") {
				const embed = new Discord.EmbedBuilder()
					.setColor(0x000000)
					.setDescription("No users are banned in this server!");

				return interaction.editReply({ embeds: [embed] });
			}

			const listEmbed = new BaseEmbed(
				`Bans for ${interaction.guild.name}`,
				interaction.user
			).setDescription(banListStr);

			return interaction.editReply({ embeds: [listEmbed] });
		}

		let banInfo;

		if (interaction.options.get("id")) {
			banInfo = bans.find(
				(ban) => ban.user.id === interaction.options.get("id")?.value
			);
		} else {
			banInfo = bans.find(
				(ban) => ban.user.tag === interaction.options.get("tag")?.value
			);
		}

		const reason = interaction.options.get("reason")?.value;

		if (banInfo) {
			const user = banInfo.user;
			if (
				!interaction.member.permissions.has(
					Discord.PermissionFlagsBits.BanMembers
				) &&
				!interaction.member.permissions.has(
					Discord.PermissionFlagsBits.Administrator
				)
			) {
				const permsEmbed = new Discord.EmbedBuilder()
					.setDescription("You do not have permissions to unban!")
					.setColor(0x000000);

				return interaction.editReply({ embeds: [permsEmbed] });
			}

			interaction.guild.members
				.unban(
					user,
					(reason ??
						`${user.tag} unbanned by ${interaction.user.tag}`) as string
				)
				.then(() => {
					const successEmbed = new Discord.EmbedBuilder()
						.setDescription(`Successfully unbanned **${user.tag}**`)
						.setColor(0x000000);

					interaction.editReply({ embeds: [successEmbed] });
				})
				.catch((err) => {
					if (err.message === "Missing Permissions") {
						const embed = new Discord.EmbedBuilder()
							.setColor(0x000000)
							.setDescription("I don't have permissions to unban this user!");

						return interaction.editReply({ embeds: [embed] });
					}

					const errEmbed = new Discord.EmbedBuilder().setDescription(
						"I was unable to unban the member because: \n`" + err + "`"
					);

					interaction.editReply({ embeds: [errEmbed] });

					console.error(err);
				});
		} else {
			const mentionEmbed = new Discord.EmbedBuilder()
				.setDescription("The tagged user is not banned!")
				.setColor(0x000000);

			interaction.editReply({ embeds: [mentionEmbed] });
		}
	},
} as Command;
