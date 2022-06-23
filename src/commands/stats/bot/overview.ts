import prettyMS from "pretty-ms";
import os from "os-utils";

import BaseEmbed from "../../../util/BaseEmbed.js";

import type Command from "../../../interfaces/client/command.js";

export default {
	name: "overview",
	description: "An overview of Singularity's statistics",
	type: "general",
	options: [],
	async slashExecute(client, interaction) {
		await interaction.deferReply({ ephemeral: true });
		os.cpuUsage((percentage) => {
			client.userModel.distinct("userID").exec((err, count) => {
				if (err) throw err;

				if (!client.user) {
					return;
				}

				const embed = new BaseEmbed("Singularity Bot Stats", interaction.user)
					.setDescription("Various statistics about Singularity")
					.setThumbnail(client.user.displayAvatarURL())
					.addFields([
						{
							name: "Uptime",
							value: `\`${prettyMS(os.processUptime() * 1000, {
								verbose: true,
							})}\``,
							inline: true,
						},
						{
							name: "Latency",
							value: `
						Bot Latency: \`${Date.now() - interaction.createdTimestamp}\` ms
						API Latency: \`${Math.round(client.ws.ping)}\` ms
					`,
							inline: true,
						},
						{
							name: "System",
							value: `
						CPU Usage: \`${Math.round((percentage * 100) / os.cpuCount())}%\`
						Memory Usage: \`${
							Math.round((process.memoryUsage().rss / 1024 / 1024) * 100) / 100
						}\` MB
					`,
							inline: true,
						},
						{
							name: "Stats",
							value: `
						Number of Servers: **${client.guilds.cache.size}**
						Number of Users: **${count.length}**
					`,
							inline: true,
						},
					]);

				interaction.editReply({ embeds: [embed] });
			});
		});
	},
} as Command;
