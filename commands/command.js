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
    let aliasString;
    let argString;
    if (command.aliases.length > 0) {
      aliasString = command.aliases.join(", ");
    } else {
      aliasString = "none";
    }

    if (command.args.length > 0) {
      argString = ``;
      for (let arg of command.args) {
        argString = argString + ` ${arg}`;
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
		**Aliases:**
		\`\`\`${aliasString}\`\`\`
		**Example:**
		\`\`\`${serverDoc.prefix}${command.example}\`\`\`
		**Notes:**
		\`\`\`${command.notes ? command.notes : "none"}\`\`\`
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
    let aliasString;
    let argString;
    if (command.aliases.length > 0) {
      aliasString = command.aliases.join(", ");
    } else {
      aliasString = "none";
    }

    if (command.args.length > 0) {
      argString = ``;
      for (let arg of command.args) {
        argString = argString + ` ${arg}`;
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
		**Aliases:**
		\`\`\`${aliasString}\`\`\`
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
  },
};
