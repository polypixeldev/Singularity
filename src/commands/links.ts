import Discord from "discord.js";

import type Command from "../interfaces/client/Command.js";

export default {
	name: "links",
	description: "Various links for Singularity",
	type: Discord.ApplicationCommandType.ChatInput,
	category: "general",
	defaultPermission: true,
	options: [],
	args: [],
	aliases: ["l"],
	example: "links",
	async slashExecute(client, interaction) {
		await interaction.deferReply({ ephemeral: true });

		const embed = new Discord.EmbedBuilder()
			.setTitle("Singularity Links")
			.setColor(0x000000);

		const row =
			new Discord.ActionRowBuilder<Discord.ButtonBuilder>().addComponents(
				new Discord.ButtonBuilder()
					.setLabel("Bot Invite")
					.setURL(
						"https://discord.com/oauth2/authorize?client_id=835256019336036423&permissions=261993005047&redirect_uri=https%3A%2F%2Fsingularitybot.glitch.me%2Flogin&scope=applications.commands%20bot"
					)
					.setStyle(Discord.ButtonStyle.Link),
				new Discord.ButtonBuilder()
					.setLabel("Support Server")
					.setURL("https://discord.gg/Q5GbzpXgSz")
					.setStyle(Discord.ButtonStyle.Link),
				new Discord.ButtonBuilder()
					.setLabel("GitHub Repository")
					.setURL("https://github.com/Poly-Pixel/Singularity")
					.setStyle(Discord.ButtonStyle.Link)
			);

		interaction.editReply({
			embeds: [embed],
			components: [row],
		});
	},
} as Command;
