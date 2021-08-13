module.exports = {
  name: "help",
  description: "Singularity Help",
  defaultPermission: true,
  options: [
    {
      name: "type",
      description: "The type of command you want to view",
      type: "STRING",
      required: false,
    },
  ],
  type: "general",
  args: ["!<command type>"],
  aliases: [],
  example: "help general",
  execute(client, Discord, msg, args, serverDoc) {
    let currentDate = new Date(Date.now());
    let generalEmbed = new Discord.MessageEmbed()
      .setColor(0x000000)
      .setTitle("Singularity General Commands")
      .setFooter(
        `General help requested by ${
          msg.author.tag
        } • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`,
        msg.author.displayAvatarURL()
      );

    let modEmbed = new Discord.MessageEmbed()
      .setColor(0x000000)
      .setColor(0x000000)
      .setTitle("Singularity Moderation Commands")
      .setFooter(
        `Moderation help requested by ${
          msg.author.tag
        } • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`,
        msg.author.displayAvatarURL()
      );

    let msEmbed = new Discord.MessageEmbed()
      .setColor(0x000000)
      .setColor(0x000000)
      .setTitle("My Singularity Commands")
      .setFooter(
        `My Singularity help requested by ${
          msg.author.tag
        } • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`,
        msg.author.displayAvatarURL()
      );

    for (let command of client.commands) {
      if (command[1].type === "general") {
        generalEmbed.addField(
          `\`${serverDoc.prefix}${command[1].name}\``,
          command[1].description
        );
      } else if (command[1].type === "mod") {
        modEmbed.addField(
          `\`${serverDoc.prefix}${command[1].name}\``,
          command[1].description
        );
      } else if (command[1].type === "ms") {
        msEmbed.addField(
          `\`${serverDoc.prefix}${command[1].name}\``,
          command[1].description
        );
      }
    }

    if (args[0] === "general") {
      msg.channel.send({ embeds: [generalEmbed] });
    } else if (args[0] === "mod") {
      msg.channel.send({ embeds: [modEmbed] });
    } else if (args[0] === "ms") {
      msg.channel.send({ embeds: [msEmbed] });
    } else {
      const embed = new Discord.MessageEmbed()
        .setTitle("Singularity Help")
        .setColor(0x000000)
        .setDescription(
          `
            **This server's prefix is:** \`${serverDoc.prefix}\`
            *Use ${serverDoc.prefix}command <COMMAND_NAME> to learn more about a command* \n
        `
        )
        .addFields(
          {
            name: "General Help",
            value: `\`${serverDoc.prefix}help general\``,
            inline: true,
          },
          {
            name: "Moderation Help",
            value: `\`${serverDoc.prefix}help mod\``,
            inline: true,
          },
          {
            name: "My Singularity Help",
            value: `\`${serverDoc.prefix}help ms\``,
            inline: true,
          }
        )
        .setFooter(
          `Help requested by ${
            msg.author.tag
          } • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`,
          msg.author.displayAvatarURL()
        );

      msg.channel.send({ embeds: [embed] });
    }
  },
  async slashExecute(client, Discord, interaction, serverDoc) {
    await interaction.deferReply({ ephemeral: true });
    let currentDate = new Date(Date.now());
    let generalEmbed = new Discord.MessageEmbed()
      .setColor(0x000000)
      .setTitle("Singularity General Commands")
      .setFooter(
        `General help requested by ${
          interaction.user.tag
        } • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`,
        interaction.user.displayAvatarURL()
      );

    let modEmbed = new Discord.MessageEmbed()
      .setColor(0x000000)
      .setColor(0x000000)
      .setTitle("Singularity Moderation Commands")
      .setFooter(
        `Moderation help requested by ${
          interaction.user.tag
        } • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`,
        interaction.user.displayAvatarURL()
      );

    let msEmbed = new Discord.MessageEmbed()
      .setColor(0x000000)
      .setColor(0x000000)
      .setTitle("My Singularity Commands")
      .setFooter(
        `My Singularity help requested by ${
          interaction.user.tag
        } • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`,
        interaction.user.displayAvatarURL()
      );

    for (let command of client.commands) {
      if (command[1].type === "general") {
        generalEmbed.addField(
          `\`${serverDoc.prefix}${command[1].name}\``,
          command[1].description
        );
      } else if (command[1].type === "mod") {
        modEmbed.addField(
          `\`${serverDoc.prefix}${command[1].name}\``,
          command[1].description
        );
      } else if (command[1].type === "ms") {
        msEmbed.addField(
          `\`${serverDoc.prefix}${command[1].name}\``,
          command[1].description
        );
      }
    }

    if (interaction.options.get("type")?.value === "general") {
      interaction.editReply({ embeds: [generalEmbed] });
    } else if (interaction.options.get("type")?.value === "mod") {
      interaction.editReply({ embeds: [modEmbed] });
    } else if (interaction.options.get("type")?.value === "ms") {
      interaction.editReply({ embeds: [msEmbed] });
    } else {
      const embed = new Discord.MessageEmbed()
        .setTitle("Singularity Help")
        .setColor(0x000000)
        .setDescription(
          `
            **This server's prefix is:** \`${serverDoc.prefix}\`
            *Use ${serverDoc.prefix}command <COMMAND_NAME> to learn more about a command* \n
        `
        )
        .addFields(
          {
            name: "General Help",
            value: `\`${serverDoc.prefix}help general\``,
            inline: true,
          },
          {
            name: "Moderation Help",
            value: `\`${serverDoc.prefix}help mod\``,
            inline: true,
          },
          {
            name: "My Singularity Help",
            value: `\`${serverDoc.prefix}help ms\``,
            inline: true,
          }
        )
        .setFooter(
          `Help requested by ${
            interaction.user.tag
          } • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`,
          interaction.user.displayAvatarURL()
        );

      interaction.editReply({ embeds: [embed] });
    }
  },
};
