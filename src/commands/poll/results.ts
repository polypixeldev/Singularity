import Discord from "discord.js";

import BaseEmbed from "../../util/BaseEmbed.js";

import type Command from "../../interfaces/client/command.js";

const optMapping = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];

export default {
	name: "results",
	description: "Shows the results of a poll",
	type: "general",
	options: [
		{
			name: "id",
			description: "The poll ID of the poll",
			type: "STRING",
			required: true,
		},
	],
	example: "poll results",
	async slashExecute(client, interaction) {
		await interaction.deferReply({ ephemeral: true });

		if (!interaction.guild) {
			return;
		}

		const fetches = [];
		for (const channel of interaction.guild.channels.cache) {
			if (!(channel[1] instanceof Discord.TextChannel)) continue;
			fetches.push(
				channel[1].messages.fetch(
					interaction.options.get("id")?.value as string
				)
			);
		}

		const pollMessage = await Promise.any(fetches);

		const invalidPoll = new Discord.MessageEmbed()
			.setColor(0x000000)
			.setDescription("The specified poll does not exist!");

		if (!pollMessage) return interaction.editReply({ embeds: [invalidPoll] });
		const embed = pollMessage.embeds[0];
		if (!embed) return interaction.editReply({ embeds: [invalidPoll] });
		let options = [];
		const data = [];
		const optStr = embed.fields.find(
			(field) => field.name === "Options"
		)?.value;

		if (!optStr) {
			return;
		}

		options = optStr
			.split("\n")
			.filter((opt) => opt !== " ")
			.map((opt) => opt.slice(4));
		for (let i = 0; i < options.length; i++) {
			const count = pollMessage.reactions.cache.get(optMapping[i])?.count;
			if (!count) {
				return;
			}

			data.push(count - 1);
		}

		const results = new BaseEmbed(
			"Poll Results",
			interaction.user
		).setDescription(`Results for poll \`${embed.title}\``);

		for (let i = 0; i < options.length; i++) {
			results.addField(options[i], `**${data[i]}** vote(s)`, true);
		}

		interaction.editReply({ embeds: [results] });
	},
} as Command;
