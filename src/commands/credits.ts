import BaseEmbed from "../util/BaseEmbed.js";

import Command from "../interfaces/client/command.js";

export default {
	name: "credits",
	description: "Credits to the makers of this bot",
	defaultPermission: true,
	options: [],
	type: "general",
	args: [],
	aliases: ["c"],
	example: "credits",
	async slashExecute(client, interaction) {
		await interaction.deferReply({ ephemeral: true });

		const embed = new BaseEmbed(
			"Singularity Credits",
			interaction.user
		).setDescription(
			`
            This bot was made by **poly#3622** and **Redstone#1165** in TypeScript using **Discord.js** and a **MongoDB** database

            Profile picture licensed under public domain at https://www.flickr.com/photos/51686021@N07/41138945550 - the creator of this image is in no way affiliated or endorses Singularity

            **Improve Singularity!** Singularity is open-source! Check out the repository on GitHub at https://github.com/Poly-Pixel/Singularity and join the support server at https://discord.gg/Q5GbzpXgSz
        `
		);

		interaction.editReply({ embeds: [embed] });
	},
} as Command;
