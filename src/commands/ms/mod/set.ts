import Discord from "discord.js";

import loadUserInfo from "../../../util/loadUserInfo.js";
import updateUser from "../../../util/updateUser.js";

import type Command from "../../../interfaces/client/Command.js";
import type ExpType from "../../../types/ExpType.js";

export default {
	name: "set",
	description:
		"Set the protons/electrons/dark matter of other My Singularity users",
	type: Discord.ApplicationCommandType.ChatInput,
	category: "ms",
	options: [
		{
			name: "user",
			description: "The user you want to manage",
			type: Discord.ApplicationCommandOptionType.User,
			required: true,
		},
		{
			name: "type",
			description: "The type you want to change",
			type: Discord.ApplicationCommandOptionType.String,
			required: true,
			choices: [
				{
					name: "Protons",
					value: "protons",
				},
				{
					name: "Electrons",
					value: "electrons",
				},
				{
					name: "Dark Matter",
					value: "darkMatter",
				},
			],
		},
		{
			name: "value",
			description:
				"The new value - prefix it with + or - to add or subtract from the current value",
			type: Discord.ApplicationCommandOptionType.String,
			required: true,
		},
	],
	args: [],
	aliases: [],
	example: "ms mod set @user protons +100",
	async slashExecute(client, interaction, serverDoc) {
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
					"You do not have permission to execute My Singularity moderation commands!"
				);

			return interaction.editReply({ embeds: [embed] });
		}

		const user = interaction.options.get("user")?.user;
		const type = interaction.options.get("type")?.value as ExpType;
		const value = interaction.options.get("value")?.value as string;

		if (!user || !type || !value) {
			return;
		}

		const mode = value.startsWith("+")
			? "add"
			: value.startsWith("-")
			? "subtract"
			: "set";

		if (isNaN(Number(value.slice(1)))) {
			const embed = new Discord.EmbedBuilder()
				.setColor(0x000000)
				.setDescription("The value provided is invalid!");

			return interaction.editReply({ embeds: [embed] });
		}

		const userMS = await loadUserInfo(client, serverDoc, user.id);

		if (mode === "add") {
			userMS[type] += Number(value.slice(1));
		} else if (mode === "subtract") {
			userMS[type] -= Number(value.slice(1));
		} else {
			userMS[type] = Number(value);
		}

		updateUser(client, serverDoc.guildID, userMS.userID, {
			...userMS.toObject(),
			[type]: userMS[type],
		}).then(() => {
			const embed = new Discord.EmbedBuilder().setColor(0x000000)
				.setDescription(`
			Set Successful
		`);

			return interaction.editReply({ embeds: [embed] });
		});
	},
} as Command;
