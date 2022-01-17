import Discord from "discord.js";

import Command from "../interfaces/client/command";

export default {
	name: "unmute",
	description: "Unmutes the mentioned user",
	defaultPermission: true,
	options: [
		{
			name: "user",
			description: "The user you want to unmute",
			type: "USER",
			required: true,
		},
		{
			name: "reason",
			description:
				'The reason for unmuting this user - defaults to "Unmuted by <your tag>" if omitted',
			type: "STRING",
			required: false,
		},
	],
	type: "mod",
	args: ["<user to unmute>"],
	aliases: [],
	example: "unmute @poly",
	notes: "user must be mentioned",
	async slashExecute(client, interaction) {
		await interaction.deferReply();
		const user = interaction.options.get("user")?.user;

		if (!interaction.guild || !user) {
			return;
		}

		const member = interaction.guild.members.resolve(
			user as Discord.GuildMemberResolvable
		);
		const unmuter = interaction.member;

		if (!member || !(unmuter instanceof Discord.GuildMember)) {
			return;
		}

		if (!member.roles.cache.find((role) => role.name === "Muted")) {
			const embed = new Discord.MessageEmbed()
				.setDescription("This member is not muted!")
				.setColor(0x000000);

			return interaction.editReply({ embeds: [embed] });
		}

		if (!unmuter.permissions.has("MUTE_MEMBERS")) {
			const permsEmbed = new Discord.MessageEmbed()
				.setDescription("You do not have permission to unmute!")
				.setColor(0x000000);
			return interaction.editReply({ embeds: [permsEmbed] });
		}
		const unmuteRole = interaction.guild.roles.cache.find(
			(role) => role.name === "Muted"
		);

		if (!unmuteRole) {
			return;
		}

		member.roles
			.remove(
				unmuteRole,
				(interaction.options.get("reason")?.value ??
					`User unmuted by ${interaction.user.tag}`) as string
			)
			.then(() => {
				const embed = new Discord.MessageEmbed()
					.setColor(0x000000)
					.setDescription(`Successfully unmuted **${user.tag}**`);

				interaction.editReply({ embeds: [embed] });
			})
			.catch((err) => {
				const embed = new Discord.MessageEmbed()
					.setColor(0x000000)
					.setDescription(
						"I was unable to unmute the member because: \n`" + err + "`"
					);

				interaction.editReply({ embeds: [embed] });
				console.error(err);
			});
	},
} as Command;
