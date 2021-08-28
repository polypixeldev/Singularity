module.exports = {
  name: "command",
  description: "Displays information about the mentioned command",
  defaultPermission: true,
  options: [
    {
      name: "command",
      description: "The name of the command you want information about",
      required: true,
      type: "STRING",
    },
    {
      name: "argument",
      description:
        "The name of the argument within the command you wish to view",
      required: false,
      type: "STRING",
    },
  ],
  type: "general",
  args: ["<command name>"],
  aliases: ["cmd"],
  example: "command help",
  notes: "Aliases are not supported",
  execute(client, Discord, msg, args, serverDoc) {
    let command;
    if (!client.commands.get(args[0])) {
      const notFoundEmbed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setDescription(
          "That command does not exist! \n **NOTE:** *The full command name (not an alias) must be provided*"
        );
      return msg.channel.send({ embeds: [notFoundEmbed] });
    } else {
      command = client.commands.get(args[0]);
    }
    let argString;

    if (command.options.length > 0) {
      argString = ``;
      for (let arg of command.options) {
        argString = argString + `${arg.name} `;
      }
    } else {
      argString = `none`;
    }

    let currentDate = new Date(Date.now());

    const embed = new Discord.MessageEmbed()
      .setColor(0x000000)
      .setTitle(`${command.name} - ${command.type.toUpperCase()}`)
      .setDescription(
        `${command.description}

        **Usage**:
        \`\`\`${serverDoc.prefix}${command.name} ${argString}\`\`\`
        **Example:**
        \`\`\`${serverDoc.prefix}${command.example}\`\`\`
		`
      )
      .setFooter(
        `Arguments marked with ! are optional - Multi-word arguments should be surrounded with doublequotes - command info requested by ${
          msg.author.tag
        } • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`,
        msg.author.displayAvatarURL()
      );
    msg.channel.send({ embeds: [embed] });
  },
  async slashExecute(client, Discord, interaction, serverDoc) {
    await interaction.deferReply({ ephemeral: true });
    let command;
    if (!client.commands.get(interaction.options.get("command").value)) {
      const notFoundEmbed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setDescription(
          "That command does not exist! \n **NOTE:** *The full command name (not an alias) must be provided*"
        );
      return interaction.editReply({ embeds: [notFoundEmbed] });
    } else {
      command = client.commands.get(interaction.options.get("command").value);
    }

    let currentDate = new Date(Date.now());
    if (!interaction.options.get("argument")?.value) {
      let argString;

      if (command.options.length > 0) {
        argString = ``;
        for (let arg of command.options) {
          argString = argString + `<${!arg.required ? "!" : ""}${arg.name}> `;
        }
      } else {
        argString = `none`;
      }

      const embed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setTitle(`${command.name} - ${command.type.toUpperCase()}`)
        .setDescription(
          `${command.description}

          **Usage**:
          \`\`\`${serverDoc.prefix}${command.name} ${argString}\`\`\`
          **Example:**
          \`\`\`${serverDoc.prefix}${command.example}\`\`\`
          **Notes:**
          \`\`\`${command.notes ? command.notes : "none"}\`\`\`
      `
        )
        .setFooter(
          `Arguments marked with ! are optional - Multi-word arguments should be surrounded with doublequotes - command info requested by ${
            interaction.user.tag
          } • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`,
          interaction.user.displayAvatarURL()
        );
      interaction.editReply({ embeds: [embed] });
    } else {
      if (
        !command.options.find(
          (option) => option.name === interaction.options.get("argument").value
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
          (option) => option.name === interaction.options.get("argument").value
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
  },
};
