module.exports = {
  name: "info",
  description: "Display information about My Singularity",
  defaultPermission: true,
  options: [],
  args: [],
  aliases: [],
  example: "ms info",
  async slashExecute(client, Discord, interaction, serverDoc) {
    await interaction.deferReply({ ephemeral: true });

    const embed = new client.utils.BaseEmbed(
      "My Singularity Info",
      interaction.user
    )
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
        
        *Use \`${serverDoc.prefix}help ms\` to get a full list of My Singularity commands*
      `,
          inline: false,
        },
        {
          name: "Dark Matter",
          value: `
            In addition to protons and electrons, you may get *dark matter*. This is an extremely rare substance, and can only be acquired naturally in 2 ways:
            
            **1.** While chatting, a unique and rare phenomenon called "quantum tunneling" may occur. When this occurs, you will recieve 1 Dark Matter.
            **2.** Once weekly, you may "explore" to get a chance at getting dark matter. More information on this feature is in \`${serverDoc.prefix}ms explore\`.
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
};
