const welcomeMessage = require("./welcomemessage.js");
const leaveMessage = require("./leavemessage.js");
module.exports = {
  name: "help",
  description: "Singularity Server Settings",
  type: "ms",
  options: [],
  args: [],
  aliases: [],
  example: "settings server",
  execute(client, Discord, msg, args, serverDoc) {
    if (args[1] === "welcome") {
      welcomeMessage.execute(client, Discord, msg, args.slice(2), serverDoc);
    } else if (args[1] === "leave") {
      leaveMessage.execute(client, Discord, msg, args.slice(2), serverDoc);
    } else {
      let currentDate = new Date(Date.now());
      const embed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setTitle(`Singularity Server Settings - ${msg.guild.name}`)
        .setDescription(
          `
				**Set/Toggle a Welcome Message:** \`${
          serverDoc.prefix
        }settings server welcome <channel> <message>\`
				 *- Current Setting:* \`${serverDoc.welcomeMessage}\` *in* \`${
            msg.guild.channels.resolve(serverDoc.welcomeChannelID).name
          }\`
				**Set/Toggle a Leave Message:** \`${
          serverDoc.prefix
        }settings server leave <channel> <message>\`
				 *- Current Setting:* \`${serverDoc.leaveMessage}\` *in* \`${
            msg.guild.channels.resolve(serverDoc.leaveChannelID).name
          }\`
			`
        )
        .setFooter(
          `Singularity Server Settings requested by ${
            msg.author.tag
          } • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`,
          msg.author.displayAvatarURL()
        );

      return msg.channel.send({ embeds: [embed] });
    }
  },
  slashExecute(client, Discord, interaction, serverDoc) {
    if (interaction.options.getSubcommand(false) === "welcomemessage") {
      welcomeMessage.slashExecute(client, Discord, interaction, serverDoc);
    } else if (interaction.options.getSubcommand(false) === "leavemessage") {
      leaveMessage.slashExecute(client, Discord, interaction, serverDoc);
    } else {
      let currentDate = new Date(Date.now());
      const embed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setTitle(`Singularity Server Settings - ${interaction.guild.name}`)
        .setDescription(
          `
				**Set/Toggle a Welcome Message:** \`${
          serverDoc.prefix
        }settings server welcome <channel> <message>\`
				 *- Current Setting:* \`${serverDoc.welcomeMessage}\` *in* \`${
            interaction.guild.channels.resolve(serverDoc.welcomeChannelID).name
          }\`
				**Set/Toggle a Leave Message:** \`${
          serverDoc.prefix
        }settings server leave <channel> <message>\`
				 *- Current Setting:* \`${serverDoc.leaveMessage}\` *in* \`${
            interaction.guild.channels.resolve(serverDoc.leaveChannelID).name
          }\`
			`
        )
        .setFooter(
          `Singularity Server Settings requested by ${
            interaction.user.tag
          } • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`,
          interaction.user.displayAvatarURL()
        );

      return interaction.editReply({ embeds: [embed] });
    }
  },
};
