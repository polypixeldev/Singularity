module.exports = {
  name: "info",
  description: "Display information about My Singularity",
  defaultPermission: true,
  options: [],
  args: [],
  aliases: [],
  example: "ms info",
  execute(client, Discord, msg, args, serverDoc) {
    let currentDate = new Date(Date.now());
    const embed = new Discord.MessageEmbed()
      .setTitle("My Singularity")
      .setColor(0x000000)
      .setFooter(
        `My Singularity info requested by ${
          msg.author.tag
        } • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`,
        msg.author.displayAvatarURL()
      ).setDescription(`
			***My Singularity is the new best way to show off what you've done for a server!***

			**What is "My Singularity"?**
			My Singularity is the feature of this bot that allows you to show off in a whole new way. \
			Instead of just plain leveling, rank cards, and leaderboards, My Singularity allows you to, hence the name, build *YOUR OWN* black hole!

			**How does it work?**
			By being active in a server, you can gain *protons* and *electrons*. These protons and electrons are a sort of currency in the My Singularity system. \
			You can use them to make your black hole bigger, or to trade them in for better items. The Developers (poly#3622 and Redstone#1165) will always be adding new features to My Singularity to keep your black hole growing!

			*Use \`${serverDoc.prefix}help ms\` to get a full list of My Singularity commands*
		`);
    msg.channel.send({ embeds: [embed] });
  },
  async slashExecute(client, Discord, interaction, serverDoc) {
    interaction.deferReply({ ephemeral: true });
    let currentDate = new Date(Date.now());
    const embed = new Discord.MessageEmbed()
      .setTitle("My Singularity")
      .setColor(0x000000)
      .setFooter(
        `My Singularity info requested by ${
          interaction.user.tag
        } • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`,
        interaction.user.displayAvatarURL()
      ).setDescription(`
			***My Singularity is the new best way to show off what you've done for a server!***

			**What is "My Singularity"?**
			My Singularity is the feature of this bot that allows you to show off in a whole new way. \
			Instead of just plain leveling, rank cards, and leaderboards, My Singularity allows you to, hence the name, build *YOUR OWN* black hole!

			**How does it work?**
			By being active in a server, you can gain *protons* and *electrons*. These protons and electrons are a sort of currency in the My Singularity system. \
			You can use them to make your black hole bigger, or to trade them in for better items. The Developers (poly#3622 and Redstone#1165) will always be adding new features to My Singularity to keep your black hole growing!

			*Use \`${serverDoc.prefix}help ms\` to get a full list of My Singularity commands*
		`);
    interaction.editReply({ embeds: [embed] });
  },
};
