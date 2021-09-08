module.exports = {
  name: "kick",
  description: "Kicks the mentioned user",
  defaultPermission: true,
  options: [
    {
      name: "user",
      type: "USER",
      description: "The user you want to kick",
      required: true,
    },
    {
      name: "reason",
      type: "STRING",
      description:
        'A short reason for kicking this user - will default to "Kicked by <your tag>" if omitted',
    },
  ],
  type: "mod",
  args: ["<user to kick>", "!<reason>"],
  aliases: [],
  example: "kick @poly spamming",
  notes: "user must be a mention",
  execute(client, Discord, msg, args) {
    let user = msg.mentions.users.first();

    if (!user) {
      user = client.utils.resolveTag(msg.guild, args[0]);
    }

    args.shift();
    const reason = args.join(" ");

    if (user) {
      const member = msg.guild.members.resolve(user);
      if (member.permissions.has("ADMINISTRATOR")) {
        const permsEmbed = new Discord.MessageEmbed()
          .setDescription("You cannot kick a moderator!")
          .setColor(0x000000);
        return msg.channel.send({ embeds: [permsEmbed] });
      }

      const kicker = msg.guild.members.resolve(msg.author);

      if (member) {
        if (
          !kicker.permissions.has("KICK_MEMBERS") &&
          !kicker.permissions.has("ADMINISTRATOR")
        ) {
          const permsEmbed = new Discord.MessageEmbed()
            .setDescription("You do not have permissions to kick!")
            .setColor(0x000000);

          return msg.channel.send({ embeds: [permsEmbed] });
        }

        member
          .kick(reason ? reason : `User kicked by ${msg.author.tag}`)
          .then(() => {
            const successEmbed = new Discord.MessageEmbed()
              .setDescription(`Successfully kicked **${user.tag}**`)
              .setColor(0x000000);

            msg.channel.send({ embeds: [successEmbed] });
          })
          .catch((err) => {
            if (err.message === "Missing Permissions") {
              const embed = new Discord.MessageEmbed()
                .setColor(0x000000)
                .setDescription("I don't have permissions to kick this user!");

              return msg.channel.send({ embeds: [embed] });
            }
            const errEmbed = new Discord.MessageEmbed().setDescription(
              "I was unable to kick the member because: \n`" + err + "`"
            );
            msg.channel.send({ embeds: [errEmbed] });

            console.log(err);
          });
      } else {
        const naEmbed = new Discord.MessageEmbed()
          .setDescription("That user isn't in this server!")
          .setColor(0x000000);

        msg.channel.send({ embeds: [naEmbed] });
      }
    } else {
      const mentionEmbed = new Discord.MessageEmbed()
        .setDescription("You didn't mention the user to kick!")
        .setColor(0x000000);

      msg.channel.send({ embeds: [mentionEmbed] });
    }
  },
  async slashExecute(client, Discord, interaction, serverDoc) {
    await interaction.deferReply();
    let user = interaction.options.get("user");

    const reason = interaction.options.get("reason");

    if (user.member.permissions.has("ADMINISTRATOR")) {
      const permsEmbed = new Discord.MessageEmbed()
        .setDescription("You cannot kick a moderator!")
        .setColor(0x000000);
      return interaction.editReply({ embeds: [permsEmbed] });
    }

    if (
      !interaction.member.permissions.has("KICK_MEMBERS") &&
      !interaction.member.permissions.has("ADMINISTRATOR")
    ) {
      const permsEmbed = new Discord.MessageEmbed()
        .setDescription("You do not have permissions to kick!")
        .setColor(0x000000);

      return interaction.editReply({ embeds: [permsEmbed] });
    }

    const kickedEmbed = new Discord.MessageEmbed()
      .setColor(0x000000)
      .setDescription(
        `You have been kicked from **${interaction.guild.name}** for \`${
          interaction.options.get("reason")?.value ??
          `User banned by ${interaction.user.tag}`
        }\``
      );

    user.user.send({ embeds: [kickedEmbed] });

    user.member
      .kick(reason?.value ?? `User kicked by ${interaction.user.tag}`)
      .then(async () => {
        const userDoc = await client.utils.loadUserInfo(
          client,
          serverDoc,
          user.user.id
        );
        userDoc.infractions.push({
          modID: interaction.user.id,
          modTag: interaction.user.tag,
          timestamp: interaction.createdTimestamp,
          type: "Kick",
          message:
            interaction.options.get("reason")?.value ??
            `User kicked by ${interaction.user.tag}`,
        });
        client.utils.updateUser(client, userDoc.guildID, userDoc.userID, {
          infractions: userDoc.infractions,
        });
        const successEmbed = new Discord.MessageEmbed()
          .setDescription(`Successfully kicked **${user.user.tag}**`)
          .setColor(0x000000);

        interaction.editReply({ embeds: [successEmbed] });
      })
      .catch((err) => {
        if (err.message === "Missing Permissions") {
          const embed = new Discord.MessageEmbed()
            .setColor(0x000000)
            .setDescription("I don't have permissions to kick this user!");

          return interaction.editReply({ embeds: [embed] });
        }
        const errEmbed = new Discord.MessageEmbed()
          .setColor(0x000000)
          .setDescription(
            "I was unable to kick the member because: \n`" + err + "`"
          );
        interaction.editReply({ embeds: [errEmbed] });

        console.log(err);
      });
  },
};
