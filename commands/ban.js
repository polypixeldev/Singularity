module.exports = {
  name: "ban",
  description: "Bans the mentioned user",
  defaultPermission: true,
  options: [
    {
      type: "USER",
      name: "user",
      description: "The user you want to ban",
      required: true,
    },
    {
      type: "INTEGER",
      name: "days",
      description: "The number of days you want to ban the user, up to 7",
      required: false,
      choices: [
        {
          name: "1 Day",
          value: 1,
        },
        {
          name: "2 Days",
          value: 2,
        },
        {
          name: "3 Days",
          value: 3,
        },
        {
          name: "4 Days",
          value: 4,
        },
        {
          name: "5 Days",
          value: 5,
        },
        {
          name: "6 Days",
          value: 6,
        },
        {
          name: "7 Days",
          value: 7,
        },
      ],
    },
    {
      type: "STRING",
      name: "reason",
      description:
        'A short reason for banning this user - will default to "Banned by <your tag>" if omitted',
      required: false,
    },
  ],
  type: "mod",
  args: ["<user to ban>", "!<number of days>", "reason"],
  aliases: ["tempban"],
  example: "ban @poly 14 Breaking the rules",
  notes:
    "number of days cannot be longer than 7 - if days are omitted, mentioned user will be banned indefinitely",
  execute(client, Discord, msg, args) {
    let user = msg.mentions.users.first();

    if (!user) {
      user = client.utils.resolveTag(msg.guild, args[0]);
    }

    if (user) {
      const member = msg.guild.members.resolve(user);
      if (member.permissions.has("ADMINISTRATOR")) {
        const permsEmbed = new Discord.MessageEmbed()
          .setDescription("You cannot ban a moderator!")
          .setColor(0x000000);
        return msg.channel.send({ embeds: [permsEmbed] });
      }

      if (member) {
        const banner = msg.guild.members.resolve(msg.author);
        if (!banner.permissions.has("BAN_MEMBERS")) {
          const permsEmbed = new Discord.MessageEmbed()
            .setDescription("You do not have permission to ban!")
            .setColor(0x000000);
          return msg.channel.send({ embeds: [permsEmbed] });
        }

        if (args[1] && isNaN(args[1])) {
          return member
            .ban({ reason: [args[1]] })
            .then(() => {
              const embed = new Discord.MessageEmbed()
                .setColor(0x000000)
                .setDescription(`Successfully banned **${user.tag}**`);
              return msg.channel.send({ embeds: [embed] });
            })
            .catch((err) => {
              if (err.message === "Missing Permissions") {
                const embed = new Discord.MessageEmbed()
                  .setColor(0x000000)
                  .setDescription(
                    "I do not have permissions to ban this user!"
                  );

                return msg.channel.send({ embeds: [embed] });
              }

              const embed = new Discord.MessageEmbed()
                .setColor(0x000000)
                .setDescription(
                  `I was unable to ban the member because: \n \`\`\`${err}\`\`\``
                );
              return msg.channel.send({ embeds: [embed] });
            });
        } else if (!args[1]) {
          return member
            .ban({ reason: `User banned by ${msg.author.tag}` })
            .then(() => {
              const embed = new Discord.MessageEmbed()
                .setColor(0x000000)
                .setDescription(`Successfully banned **${user.tag}**`);
              return msg.channel.send({ embeds: [embed] });
            })
            .catch((err) => {
              if (err.message === "Missing Permissions") {
                const embed = new Discord.MessageEmbed()
                  .setColor(0x000000)
                  .setDescription(
                    "I do not have permissions to ban this user!"
                  );

                return msg.channel.send({ embeds: [embed] });
              }

              const embed = new Discord.MessageEmbed()
                .setColor(0x000000)
                .setDescription(
                  `I was unable to ban the member because: \n \`\`\`${err}\`\`\``
                );
              return msg.channel.send({ embeds: [embed] });
            });
        } else {
          if (args[1] > 7) {
            const embed = new Discord.MessageEmbed()
              .setColor(0x000000)
              .setDescription(
                "You cannot tempban someone for more than 7 days!"
              );

            return msg.channel.send({ embeds: [embed] });
          }

          member
            .ban({
              days: args[1],
              reason: args[2] ? args[2] : `User banned by ${msg.author.tag}`,
            })
            .then(() => {
              const embed = new Discord.MessageEmbed()
                .setColor(0x000000)
                .setDescription(`Successfully banned **${user.tag}**`);
              return msg.channel.send({ embeds: [embed] });
            })
            .catch((err) => {
              if (err.message === "Missing Permissions") {
                const embed = new Discord.MessageEmbed()
                  .setColor(0x000000)
                  .setDescription(
                    "I do not have permissions to ban this user!"
                  );

                return msg.channel.send({ embeds: [embed] });
              }

              const embed = new Discord.MessageEmbed()
                .setColor(0x000000)
                .setDescription(
                  `I was unable to ban the member because: \n \`\`\`${err}\`\`\``
                );
              return msg.channel.send({ embeds: [embed] });
            });
        }
      } else {
        const embed = new Discord.MessageEmbed()
          .setColor(0x000000)
          .setDescription("That user isn't in this guild!");
        msg.channel.send({ embeds: [embed] });
      }
    } else {
      const embed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setDescription("You didn't mention the user to ban!");
      msg.channel.send({ embeds: [embed] });
    }
  },
  async slashExecute(client, Discord, interaction, serverDoc) {
    await interaction.deferReply();
    let user = interaction.options.get("user");

    if (user.member.permissions.has("ADMINISTRATOR")) {
      const permsEmbed = new Discord.MessageEmbed()
        .setDescription("You cannot ban a moderator!")
        .setColor(0x000000);
      return interaction.editReply({ embeds: [permsEmbed] });
    }

    if (!interaction.member.permissions.has("BAN_MEMBERS")) {
      const permsEmbed = new Discord.MessageEmbed()
        .setDescription("You do not have permission to ban!")
        .setColor(0x000000);
      return interaction.editReply({ embeds: [permsEmbed] });
    }

    const bannedEmbed = new Discord.MessageEmbed()
      .setColor(0x000000)
      .setDescription(
        `You have been banned from **${interaction.guild.name}** for \`${
          interaction.options.get("reason")?.value ??
          `User banned by ${interaction.user.tag}`
        }\``
      );

    await user.user.send({ embeds: [bannedEmbed] });

    return user.member
      .ban({
        reason:
          interaction.options.get("reason")?.value ??
          `User banned by ${interaction.user.tag}`,
        days: interaction.options.get("days")?.value,
      })
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
          type: "Ban",
          message:
            interaction.options.get("reason")?.value ??
            `User banned by ${interaction.user.tag}`,
        });
        client.utils.updateUser(
          client,
          userDoc.guildID,
          userDoc.userID,
          userDoc
        );

        const embed = new Discord.MessageEmbed()
          .setColor(0x000000)
          .setDescription(`Successfully banned **${user.user.tag}**`);
        return interaction.editReply({ embeds: [embed] });
      })
      .catch((err) => {
        if (err.message === "Missing Permissions") {
          const embed = new Discord.MessageEmbed()
            .setColor(0x000000)
            .setDescription("I do not have permissions to ban this user!");

          return interaction.editReply({ embeds: [embed] });
        }

        const embed = new Discord.MessageEmbed()
          .setColor(0x000000)
          .setDescription(
            `I was unable to ban the member because: \n \`\`\`${err}\`\`\``
          );
        return interaction.editReply({ embeds: [embed] });
      });
  },
};
