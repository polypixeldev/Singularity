module.exports = {
  name: "help",
  description: "Singularity Help",
  defaultPermission: true,
  options: [],
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
        let desc = [];

        for (let option of command[1].options) {
          if (option.type === "SUB_COMMAND_GROUP") {
            desc.push(`\n \`${option.name}\` - ${option.description}`);
            for (let subcmd of option.options) {
              desc.push(
                `\n :arrow_forward: \`${subcmd.name}\` - ${subcmd.description}`
              );
            }
            desc.push("\n");
          } else if (option.type === "SUB_COMMAND") {
            desc.push(`\n \`${option.name}\` - ${option.description} \n`);
          }
        }

        desc.unshift(`${command[1].description} \n`);

        desc = desc.join("");

        generalEmbed.addField(
          `\`${serverDoc.prefix}${command[1].name}\``,
          desc
        );
      } else if (command[1].type === "mod") {
        let desc = [];

        for (let option of command[1].options) {
          if (option.type === "SUB_COMMAND_GROUP") {
            desc.push(`\n \`${option.name}\` - ${option.description}`);
            for (let subcmd of option.options) {
              desc.push(
                `\n :arrow_forward: \`${subcmd.name}\` - ${subcmd.description}`
              );
            }
            desc.push("\n");
          } else if (option.type === "SUB_COMMAND") {
            desc.push(`\n \`${option.name}\` - ${option.description} \n`);
          }
        }

        desc.unshift(`${command[1].description} \n`);

        desc = desc.join("");

        modEmbed.addField(`\`${serverDoc.prefix}${command[1].name}\``, desc);
      } else if (command[1].type === "ms") {
        let desc = [];

        for (let option of command[1].options) {
          if (option.type === "SUB_COMMAND_GROUP") {
            desc.push(`\n \`${option.name}\` - ${option.description}`);
            for (let subcmd of option.options) {
              desc.push(
                `\n :arrow_forward: \`${subcmd.name}\` - ${subcmd.description}`
              );
            }
            desc.push("\n");
          } else if (option.type === "SUB_COMMAND") {
            desc.push(`\n \`${option.name}\` - ${option.description} \n`);
          }
        }

        desc.unshift(`${command[1].description} \n`);

        desc = desc.join("");

        msEmbed.addField(`\`${serverDoc.prefix}${command[1].name}\``, desc);
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
        let desc = [];

        for (let option of command[1].options) {
          if (option.type === "SUB_COMMAND_GROUP") {
            desc.push(`\n \`${option.name}\` - ${option.description}`);
            for (let subcmd of option.options) {
              desc.push(
                `\n :arrow_forward: \`${subcmd.name}\` - ${subcmd.description}`
              );
            }
            desc.push("\n");
          } else if (option.type === "SUB_COMMAND") {
            desc.push(`\n \`${option.name}\` - ${option.description} \n`);
          }
        }

        desc.unshift(`${command[1].description} \n`);

        desc = desc.join("");

        generalEmbed.addField(
          `\`${serverDoc.prefix}${command[1].name}\``,
          desc
        );
      } else if (command[1].type === "mod") {
        let desc = [];

        for (let option of command[1].options) {
          if (option.type === "SUB_COMMAND_GROUP") {
            desc.push(`\n \`${option.name}\` - ${option.description}`);
            for (let subcmd of option.options) {
              desc.push(
                `\n :arrow_forward: \`${subcmd.name}\` - ${subcmd.description}`
              );
            }
            desc.push("\n");
          } else if (option.type === "SUB_COMMAND") {
            desc.push(`\n \`${option.name}\` - ${option.description} \n`);
          }
        }

        desc.unshift(`${command[1].description} \n`);

        desc = desc.join("");

        modEmbed.addField(`\`${serverDoc.prefix}${command[1].name}\``, desc);
      } else if (command[1].type === "ms") {
        let desc = [];

        for (let option of command[1].options) {
          if (option.type === "SUB_COMMAND_GROUP") {
            desc.push(`\n \`${option.name}\` - ${option.description}`);
            for (let subcmd of option.options) {
              desc.push(
                `\n :arrow_forward: \`${subcmd.name}\` - ${subcmd.description}`
              );
            }
            desc.push("\n");
          } else if (option.type === "SUB_COMMAND") {
            desc.push(`\n \`${option.name}\` - ${option.description} \n`);
          }
        }

        desc.unshift(`${command[1].description} \n`);

        desc = desc.join("");

        msEmbed.addField(`\`${serverDoc.prefix}${command[1].name}\``, desc);
      }
    }
    let latestEmbed = new Discord.MessageEmbed()
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

    let components = [
      {
        type: "ACTION_ROW",
        components: [
          {
            type: "SELECT_MENU",
            label: "Command Category",
            custom_id: "type",
            options: [
              {
                label: "General",
                value: "general",
                description: "General Singularity Commands",
              },
              {
                label: "Moderation",
                value: "mod",
                description: "Moderation Singularity Commands",
              },
              {
                label: "My Singularity",
                value: "ms",
                description: "My Singularity Commands",
              },
            ],
          },
        ],
      },
    ];

    interaction
      .editReply({
        embeds: [latestEmbed],
        components: components,
      })
      .then((sent) => {
        let collector = sent.createMessageComponentCollector({
          componentType: "SELECT_MENU",
          time: 300000,
          dispose: true,
        });

        collector.on("collect", async (selection) => {
          await selection.deferUpdate();

          console.log(selection.values);
          latestEmbed =
            selection.values[0] === "general"
              ? generalEmbed
              : selection.values[0] === "mod"
              ? modEmbed
              : msEmbed;

          selection.editReply({
            embeds: [latestEmbed],
            components: components,
          });
        });

        collector.on("end", () => {
          interaction.editReply({
            embeds: [latestEmbed],
            components: components,
          });
        });
      });
  },
};
