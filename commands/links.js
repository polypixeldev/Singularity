module.exports = {
  name: "links",
  description: "Various links for Singularity",
  type: "general",
  defaultPermission: true,
  options: [],
  args: [],
  aliases: ["l"],
  example: "links",
  execute(client, Discord, msg) {
    let currentDate = new Date(Date.now());
    const embed = new Discord.MessageEmbed()
      .setTitle("Singularity Links")
      .setColor(0x000000);

    msg.reply({ embeds: [embed], components: [
      {
        type: "ACTION_ROW",
        components: [
          {
            type: "BUTTON",
            label: "Bot Invite",
            url: "https://discord.com/oauth2/authorize?client_id=860552124064202812&permissions=261993005047&redirect_uri=https%3A%2F%2Fsingularitybot.glitch.me%2Flogin&scope=applications.commands%20bot",
            style: "LINK",
          },
          {
            type: "BUTTON",
            label: "Support Server",
            url: "https://discord.gg/Q5GbzpXgSz",
            style: "LINK",
          },
          {
            type: "BUTTON",
            label: "GitHub Repository",
            url: "https://github.com/Poly-Pixel/Singularity",
            style: "LINK",
          },
        ],
      },
    ], });
  },
  async slashExecute(client, Discord, interaction) {
    await interaction.deferReply({ ephemeral: true });

    const embed = new Discord.MessageEmbed()
      .setTitle("Singularity Links")
      .setColor(0x000000);

    interaction.editReply({
      embeds: [embed],
      components: [
        {
          type: "ACTION_ROW",
          components: [
            {
              type: "BUTTON",
              label: "Bot Invite",
              url: "https://discord.com/oauth2/authorize?client_id=860552124064202812&permissions=261993005047&redirect_uri=https%3A%2F%2Fsingularitybot.glitch.me%2Flogin&scope=applications.commands%20bot",
              style: "LINK",
            },
            {
              type: "BUTTON",
              label: "Support Server",
              url: "https://discord.gg/Q5GbzpXgSz",
              style: "LINK",
            },
            {
              type: "BUTTON",
              label: "GitHub Repository",
              url: "https://github.com/Poly-Pixel/Singularity",
              style: "LINK",
            },
          ],
        },
      ],
    });
  },
};
