module.exports = {
  name: "help",
  description: "Singularity Moderation Settings",
  type: "mod",
  options: [],
  args: [],
  aliases: [],
  example: "settings mod",
  execute(client, Discord, msg, args) {
    if (args[1] === "") {
      //eslint-disable-line
    } else {
      let currentDate = new Date(Date.now());
      const embed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setTitle(`Singularity Mod Settings - ${msg.guild.name}`)
        .setDescription(
          `
	
			`
        )
        .setFooter(
          `Singularity Mod Settings requested by ${
            msg.author.tag
          }  • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`,
          msg.author.displayAvatarURL()
        );

      return msg.channel.send({ embeds: [embed] });
    }
  },
  slashExecute(client, Discord, interaction) {
    if (interaction.options.getSubcommand(false) === "") {
      //eslint-disable-line
    } else {
      let currentDate = new Date(Date.now());
      const embed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setTitle(`Singularity Mod Settings - ${interaction.guild.name}`)
        .setDescription(
          `
	
			`
        )
        .setFooter(
          `Singularity Mod Settings requested by ${
            interaction.user.tag
          }  • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`,
          interaction.user.displayAvatarURL()
        );

      return interaction.editReply({ embeds: [embed] });
    }
  },
};
