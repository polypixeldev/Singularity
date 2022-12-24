import Discord from "discord.js";
import axios from "axios";

import type Command from "../interfaces/client/Command.js";

export default {
	name: "xkcd",
	description: "Displays the latest xkcd comic",
	options: [
		{
			name: "num",
			description: "The comic to display",
			type: Discord.ApplicationCommandOptionType.Integer,
		},
	],
	type: Discord.ApplicationCommandType.ChatInput,
	category: "general",
	async slashExecute(client, interaction) {
		await interaction.deferReply();

		const num = interaction.options.get("num")?.value;

		let data;
		if (num) {
			data = (await axios.get(`https://xkcd.com/${num}/info.0.json`)).data;
		} else {
			data = (await axios.get("https://xkcd.com/info.0.json")).data;
		}

		const embed = new Discord.EmbedBuilder()
			.setTitle(`xkcd #${data.num} - ${data.title}`)
			.setImage(data.img)
			.setAuthor({ name: "Randall Munroe", url: "https://xkcd.com" })
			.setColor(0x000000)
			.setDescription(data.alt)
			.setURL(`https://xkcd.com/${data.num}/`)
			.setFooter({
				text: `Published on ${data.month}/${data.day}/${data.year}`,
			});

		interaction.editReply({ embeds: [embed] });
	},
} as Command;
