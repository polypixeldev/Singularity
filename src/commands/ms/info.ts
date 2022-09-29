import Discord from "discord.js";

import BaseEmbed from "../../util/BaseEmbed.js";

import type Command from "../../interfaces/client/Command.js";

export default {
	name: "info",
	description: "Display information about My Singularity",
	defaultPermission: true,
	options: [],
	type: Discord.ApplicationCommandType.ChatInput,
	category: "ms",
	example: "ms info",
	async slashExecute(client, interaction) {
		await interaction.deferReply({ ephemeral: true });

		const embed = new BaseEmbed("My Singularity Info", interaction.user)
			.setDescription(
				`
			***My Singularity is the new best way to show off what you've done for a server!***
		`
			)
			.addFields(
				{
					name: '**What is "My Singularity"?**',
					value: `
        My Singularity is the feature of this bot that allows you to show off in a whole new way.
        Instead of just plain leveling, rank cards, and leaderboards, My Singularity allows you to, hence the name, build *YOUR OWN* black hole!
      `,
					inline: false,
				},
				{
					name: "**How does it work?**",
					value: `
        By being active in a server, you can gain *protons* and *electrons*. These protons and electrons are a sort of currency in the My Singularity system. \
        You can use them to make your black hole bigger, or to trade them in for better items. The Developers (poly#3622 and Redstone#1165) will always be adding new features to My Singularity to keep your black hole growing!
        
        *Select the My Singularity option in \`/help\` to get a full list of My Singularity commands*
      `,
					inline: false,
				},
				{
					name: "Dark Matter",
					value: `
            In addition to protons and electrons, you may get *dark matter*. This is an extremely rare substance, and can only be acquired naturally in 1 way (more coming soon!):
            
            - While chatting, a unique and rare phenomenon called "quantum tunneling" may occur. When this occurs, you will recieve 1 Dark Matter.
          `,
					inline: false,
				},
				{
					name: "Additional Features",
					value: `
            However, your Singularity won't last forever. When you become inactive and generate no protons or electrons for your Singularity, it will start to radiate away.
            This process is slow, and won't start the moment you don't log on for a week. Nevertheless, after a period of inactivity, your protons and electrons will begin to fade away.
            Note that your Lifetime Experience is not affected by this process.
          `,
					inline: false,
				}
			);

		interaction.editReply({ embeds: [embed] });
	},
} as Command;
