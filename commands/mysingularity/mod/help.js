const Set = require("./set.js");
module.exports = {
  name: "help",
  description: "Moderate My Singularity!",
  type: "ms",
  options: [],
  args: [],
  aliases: [],
  example: "ms mod",
  execute(client, Discord, msg, args, serverDoc) {
    if (!msg.member.hasPermission("ADMINISTRATOR")) {
      const embed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setDescription(
          "You do not have permission to execute My Singularity moderation commands!"
        );

      return msg.channel.send({ embeds: [embed] });
    } else {
      if (args[1] === "set") {
        Set(client, Discord, msg, args, serverDoc);
      }
    }
  },
  async slashExecute(client, Discord, interaction, serverDoc) {
    await interaction.deferReply({ ephemeral: true });
    if (!interaction.member.permissions.has("ADMINISTRATOR")) {
      const embed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setDescription(
          "You do not have permission to execute My Singularity moderation commands!"
        );

      return interaction.editReply({ embeds: [embed] });
    } else {
      if (interaction.options.getSubcommand(false) === "set") {
        Set.slashExecute(client, Discord, interaction, serverDoc);
      } else {
        const currentDate = new Date(Date.now());

        const embed = new Discord.MessageEmbed()
          .setColor(0x000000)
          .setTitle("My Singularity Moderation")
          .setDescription("")
          .setFooter(
            `Moderation help requested by ${
              interaction.user.tag
            } • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`,
            interaction.user.displayAvatarURL()
          );

        interaction.editReply({ embeds: [embed] });
      }
    }
  },
};
