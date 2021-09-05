module.exports = {
  name: "help",
  description: "Singularity Help",
  defaultPermission: true,
  options: [
    {
      name: "command",
      description: "The name of the command you want information about",
      required: false,
      type: "STRING",
    },
    {
      name: "argument",
      description: "The name of the argument you wish to view",
      required: false,
      type: "STRING",
    },
    {
      name: "group",
      description: "The name of a subcommand group within the command",
      required: false,
      type: "STRING",
    },
    {
      name: "subcommand",
      description:
        "The name of a subcommand within the command or subcommand group",
      required: false,
      type: "STRING",
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
    if (interaction.options.get("command")) {
      let command;
      let subcommand;
      let group;
      if (!client.commands.get(interaction.options.get("command").value)) {
        const notFoundEmbed = new Discord.MessageEmbed()
          .setColor(0x000000)
          .setDescription(
            "That command does not exist! \n **NOTE:** *The full command name (not an alias) must be provided*"
          );
        return interaction.editReply({ embeds: [notFoundEmbed] });
      } else {
        command = client.commands.get(interaction.options.get("command").value);
        if (interaction.options.get("group")) {
          group = command.options.find(
            (opt) =>
              opt.type === "SUB_COMMAND_GROUP" &&
              opt.name === interaction.options.get("group").value
          );
          if (!group) {
            const embed = new Discord.MessageEmbed()
              .setColor(0x000000)
              .setDescription("The specified subcommand group does not exist!");

            return interaction.editReply({ embeds: [embed] });
          }
        }

        if (interaction.options.get("subcommand")) {
          if (group) {
            subcommand = group.options.find(
              (opt) =>
                opt.type === "SUB_COMMAND" &&
                opt.name === interaction.options.get("subcommand").value
            );
            if (!subcommand) {
              const embed = new Discord.MessageEmbed()
                .setColor(0x000000)
                .setDescription(
                  "The specified subcommand does not exist within the specified group!"
                );

              return interaction.editReply({ embeds: [embed] });
            }
          } else {
            subcommand = command.options.find(
              (opt) =>
                opt.type === "SUB_COMMAND" &&
                opt.name === interaction.options.get("subcommand").value
            );
            if (!subcommand) {
              const embed = new Discord.MessageEmbed()
                .setColor(0x000000)
                .setDescription("The specified subcommand does not exist!");

              return interaction.editReply({ embeds: [embed] });
            }
          }
        }
      }

      let currentDate = new Date(Date.now());
      if (!interaction.options.get("argument")?.value) {
        if (command && ((group && subcommand) || (!group && !subcommand))) {
          let argString;
          let subGrpStr = "";
          let subStr = "";

          if (subcommand?.options.length ?? command.options.length > 0) {
            argString = ``;
            for (let arg of subcommand?.options ?? command.options) {
              if (arg.type === "SUB_COMMAND_GROUP") {
                subGrpStr = subGrpStr + ` - ${arg.name} \n`;
              } else if (arg.type === "SUB_COMMAND") {
                subStr = subStr + ` - ${arg.name} \n`;
              } else {
                argString =
                  argString + `<${!arg.required ? "!" : ""}${arg.name}> `;
              }
            }
          } else {
            argString = `none`;
          }

          const embed = new Discord.MessageEmbed()
            .setColor(0x000000)
            .setTitle(
              `${command.name} - ${group ? `Group "${group.name}" - ` : ""}${
                subcommand ? `Subcommand "${subcommand.name}" - ` : ""
              } ${command.type.toUpperCase()}`
            )
            .setDescription(
              `${subcommand?.description ?? command.description}
            **Usage**:
            \`\`\`${serverDoc.prefix}${
                subcommand?.name ?? command.name
              } ${argString}\`\`\`
            **Example:**
            \`\`\`${serverDoc.prefix}${
                subcommand?.example ?? command.example
              }\`\`\`
            **Notes:**
            \`\`\`${subcommand?.notes ?? command.notes ?? "none"}\`\`\`
            **Subcommand Groups:**
            \`\`\`${subGrpStr !== "" ? subGrpStr : "None"}\`\`\`
            **Subcommands:**
            \`\`\`${subStr !== "" ? subStr : "None"}\`\`\`
        `
            )
            .setFooter(
              `Arguments marked with ! are optional - use the argument option to inspect an argument - command info requested by ${
                interaction.user.tag
              } • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`,
              interaction.user.displayAvatarURL()
            );
          return interaction.editReply({ embeds: [embed] });
        } else if (group) {
          let subStr = "";
          for (let subcmd of group.options) {
            subStr = subStr + ` - **${subcmd.name}** \n`;
          }

          const embed = new Discord.MessageEmbed()
            .setColor(0x000000)
            .setTitle(
              `${command.name} - Group "${
                group.name
              }" - ${command.type.toUpperCase()}`
            )
            .setDescription(
              `
            ${group.description}
            **Subcommands:**
            ${subStr}
            `
            )
            .setFooter(
              `Group info requested by ${
                interaction.user.tag
              } • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`,
              interaction.user.displayAvatarURL()
            );
          return interaction.editReply({ embeds: [embed] });
        }
      } else {
        if (
          !command.options.find(
            (option) =>
              option.name === interaction.options.get("argument").value
          )
        ) {
          const argNotFoundEmbed = new Discord.MessageEmbed()
            .setColor(0x000000)
            .setDescription(
              "That argument does not exist! \n **NOTE:** *The full command name (not an alias) must be provided*"
            );

          return interaction.editReply({ embeds: [argNotFoundEmbed] });
        } else {
          const argument = command.options.find(
            (option) =>
              option.name === interaction.options.get("argument").value
          );
          const argEmbed = new Discord.MessageEmbed()
            .setColor(0x000000)
            .setTitle(`${command.name} - Argument "${argument.name}"`)
            .addFields([
              {
                name: "Description",
                value: argument.description,
              },
              {
                name: "Type",
                value: argument.type,
              },
              {
                name: "Required",
                value: argument.required?.toString() ?? "False",
              },
            ])
            .setFooter(
              `command info requested by ${
                interaction.user.tag
              } • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`,
              interaction.user.displayAvatarURL()
            );

          return interaction.editReply({ embeds: [argEmbed] });
        }
      }
    } else {
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
    }
  },
};
