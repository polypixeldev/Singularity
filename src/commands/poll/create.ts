import Discord from "discord.js";

import type Command from "../../interfaces/client/Command.js";

const optMapping = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];

export default {
	name: "create",
	description: "Creates a poll",
	type: Discord.ApplicationCommandType.ChatInput,
	category: "general",
	options: [
		{
			name: "title",
			description: "The title of the poll",
			type: Discord.ApplicationCommandOptionType.String,
			required: true,
		},
		{
			name: "option1",
			description: "The first option",
			type: Discord.ApplicationCommandOptionType.String,
			required: true,
		},
		{
			name: "option2",
			description: "The second option",
			type: Discord.ApplicationCommandOptionType.String,
			required: true,
		},
		{
			name: "option3",
			description: "The third option",
			type: Discord.ApplicationCommandOptionType.String,
			required: false,
		},
		{
			name: "option4",
			description: "The fourth option",
			type: Discord.ApplicationCommandOptionType.String,
			required: false,
		},
		{
			name: "option5",
			description: "The fifth option",
			type: Discord.ApplicationCommandOptionType.String,
			required: false,
		},
		{
			name: "option6",
			description: "The sixth option",
			type: Discord.ApplicationCommandOptionType.String,
			required: false,
		},
		{
			name: "option7",
			description: "The seventh option",
			type: Discord.ApplicationCommandOptionType.String,
			required: false,
		},
		{
			name: "option8",
			description: "The eighth option",
			type: Discord.ApplicationCommandOptionType.String,
			required: false,
		},
		{
			name: "option9",
			description: "The ninth option",
			type: Discord.ApplicationCommandOptionType.String,
			required: false,
		},
		{
			name: "option10",
			description: "The tenth option",
			type: Discord.ApplicationCommandOptionType.String,
			required: false,
		},
		{
			name: "description",
			description: "The description of the poll",
			type: Discord.ApplicationCommandOptionType.String,
			required: false,
		},
		{
			name: "color",
			description: "The hex color of the poll embed (just the 6 characters)",
			type: Discord.ApplicationCommandOptionType.String,
			required: false,
		},
	],
	example: 'poll create "Yes or no?" "Yes" "No"',
	async slashExecute(client, interaction) {
		await interaction.deferReply();
		const title = interaction.options.get("title")?.value;
		const description = interaction.options.get("description")?.value ?? "";
		const colorStr = interaction.options.get("color")?.value ?? "000000";
		const options = [
			interaction.options.get("option1")?.value,
			interaction.options.get("option2")?.value,
			interaction.options.get("option3")?.value,
			interaction.options.get("option4")?.value,
			interaction.options.get("option5")?.value,
			interaction.options.get("option6")?.value,
			interaction.options.get("option7")?.value,
			interaction.options.get("option8")?.value,
			interaction.options.get("option9")?.value,
			interaction.options.get("option10")?.value,
		];
		const cleanOptions = options.filter((opt) => typeof opt === "string");

		let optStr = "";
		for (let i = 0; i < cleanOptions.length; i++) {
			optStr = optStr + `${optMapping[i]} ${cleanOptions[i]} \n \n`;
		}

		const currentDate = new Date(Date.now());
		const poll = new Discord.EmbedBuilder()
			.setTitle(title as string)
			.setFooter({
				text: `Poll created by ${
					interaction.user.tag
				} • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`,
				iconURL: interaction.user.displayAvatarURL(),
			});

		try {
			poll.setColor(`#${colorStr}`);
		} catch {
			const embed = new Discord.EmbedBuilder()
				.setColor(0x000000)
				.setDescription("Invalid hex color provided");

			return interaction.editReply({ embeds: [embed] });
		}

		if (description !== "")
			poll.addFields({
				name: "Description",
				value: description as string,
				inline: false,
			});

		poll.addFields({
			name: "Options",
			value: optStr,
			inline: false,
		});

		interaction.editReply({ embeds: [poll] }).then((sent) => {
			if (!(sent instanceof Discord.Message)) {
				return;
			}

			const sentEmbed = sent.embeds[0];
			const sentBuilder = Discord.EmbedBuilder.from(sentEmbed);
			sentBuilder.setFooter({
				text: `Poll ID: ${sent.id} • Poll created by ${
					interaction.user.tag
				} • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`,
				iconURL: interaction.user.displayAvatarURL(),
			});

			sent.edit({ embeds: [sentBuilder] }).then((newSent) => {
				for (let i = 0; i < cleanOptions.length; i++) {
					newSent.react(optMapping[i]);
				}
			});
		});
	},
} as Command;
