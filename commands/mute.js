module.exports = {
  name: "mute",
  description: "Mutes the mentioned user h",
  defaultPermission: true,
  options: [
    {
      name: "user",
      type: "USER",
      description: "The user you want to mute",
      required: true,
    },
    {
      name: "reason",
      type: "STRING",
      description:
        'A short reason for muting this user - will default to "Muted by <your tag>" if omitted',
      required: false,
    },
  ],
  type: "mod",
  args: ["<user to mute>"],
  aliases: [],
  example: "mute @poly",
  notes: "user must be mentioned",
  async execute(client, Discord, msg, args) {
    let user = msg.mentions.users.first();

    if (!user) {
      user = client.utils.resolveTag(msg.guild, args[0]);
    }

    if (user) {
      const member = msg.guild.members.resolve(user);

      if (member.permissions.has("ADMINISTRATOR")) {
        const permsEmbed = new Discord.MessageEmbed()
          .setDescription("You cannot mute a moderator!")
          .setColor(0x000000);

        return msg.channel.send({ embeds: [permsEmbed] });
      }

      if (member.roles.cache.find((role) => role.name === "Muted")) {
        const embed = new Discord.MessageEmbed()
          .setDescription("This member is already muted!")
          .setColor(0x000000);

        return msg.channel.send({ embeds: [embed] });
      }

      const muter = msg.guild.members.resolve(msg.author);

      if (member) {
        if (!muter.permissions.has("MUTE_MEMBERS")) {
          const permsEmbed = new Discord.MessageEmbed()
            .setDescription("You do not have permissions to mute!")
            .setColor(0x000000);

          return msg.channel.send({ embeds: [permsEmbed] });
        }

        let rolesize;
        msg.guild.roles.fetch().then((roles) => (rolesize = roles.cache.size));

        let muteRole = member.guild.roles.cache.find(
          (rl) => rl.name === "Muted"
        );

        if (!muteRole) {
          const aGuild = client.guilds.resolve(msg.channel);
          await aGuild.roles.create({
            name: "Muted",
            color: "#FFFFFF",
            hoist: true,
            position: rolesize,
            permissions: 66560n,
            mentionable: false,
            reason: "mute role",
          });

          muteRole = member.guild.roles.cache.find((rl) => rl.name === "Muted");

          let channels = member.guild.channels.cache;

          channels.mapValues((chanel) => {
            if (!(chanel instanceof Discord.ThreadChannel)) {
              if (chanel.manageable) {
                if (chanel.isText()) {
                  chanel.permissionOverwrites.create(
                    muteRole,
                    {
                      SEND_MESSAGES: false,
                    },
                    {
                      reason: "Setting up Muted role",
                    }
                  );
                } else {
                  chanel.permissionOverwrites.create(
                    muteRole,
                    {
                      SPEAK: false,
                    },
                    {
                      reason: "Setting up Muted role",
                    }
                  );
                }
              }
            }
          });
        }

        member.roles
          .add(muteRole, args[1])
          .then(() => {
            const embed = new Discord.MessageEmbed()
              .setColor(0x000000)
              .setDescription(`Successfully muted **${user.tag}**`);

            msg.channel.send({ embeds: [embed] });
          })
          .catch((err) => {
            const embed = new Discord.MessageEmbed()
              .setColor(0x000000)
              .setDescription(
                "I was unable to mute the member because: \n`" + err + "`"
              );

            msg.channel.send({ embeds: [embed] });
            console.error(err);
          });
      } else {
        const embed = new Discord.MessageEmbed()
          .setColor(0x000000)
          .setDescription("That user isn't in this server!");

        msg.channel.send({ embeds: [embed] });
      }
    } else {
      const embed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setDescription("You didn't mention the user to mute!");

      msg.channel.send({ embeds: [embed] });
    }
  },
  async slashExecute(client, Discord, interaction) {
    await interaction.deferReply({ ephemeral: true });
    let user = interaction.options.get("user");

    if (user.member.permissions.has("ADMINISTRATOR")) {
      const permsEmbed = new Discord.MessageEmbed()
        .setDescription("You cannot mute a moderator!")
        .setColor(0x000000);

      return interaction.editReply({ embeds: [permsEmbed] });
    }

    if (!interaction.member.permissions.has("MUTE_MEMBERS")) {
      const permsEmbed = new Discord.MessageEmbed()
        .setDescription("You do not have permissions to mute!")
        .setColor(0x000000);

      return interaction.editReply({ embeds: [permsEmbed] });
    }

    if (user.member.roles.cache.find((role) => role.name === "Muted")) {
      const embed = new Discord.MessageEmbed()
        .setDescription("This member is already muted!")
        .setColor(0x000000);

      return interaction.editReply({ embeds: [embed] });
    }

    await interaction.guild.roles.fetch();

    let muteRole = interaction.guild.roles.cache.find(
      (rl) => rl.name === "Muted"
    );

    if (!muteRole) {
      await interaction.guild.roles.create({
        name: "Muted",
        color: "#FFFFFF",
        hoist: true,
        permissions: 66560n,
        mentionable: false,
        reason: "mute role",
      });

      muteRole = interaction.guild.roles.cache.find(
        (rl) => rl.name === "Muted"
      );

      let channels = interaction.member.guild.channels.cache

          channels.mapValues(chanel => {
            if(!(chanel instanceof Discord.ThreadChannel)){
              if(chanel.manageable){
                if(chanel.isText()){
                  chanel.permissionOverwrites.create(muteRole, {
                    SEND_MESSAGES: false
                  }, {
                    reason: 'Setting up Muted role'
                  })
                } else {
                  chanel.permissionOverwrites.create(muteRole, {
                    SPEAK: false
                  }, {
                    reason: 'Setting up Muted role'
                  })
                }
              }
            }
          })
    }

    user.member.roles
      .add(
        muteRole,
        interaction.options.get("reason")?.value ??
          `User muted by ${interaction.user.tag}`
      )
      .then(() => {
        const embed = new Discord.MessageEmbed()
          .setColor(0x000000)
          .setDescription(`Successfully muted **${user.user.tag}**`);

        interaction.editReply({ embeds: [embed] });
      })
      .catch((err) => {
        const embed = new Discord.MessageEmbed()
          .setColor(0x000000)
          .setDescription(
            "I was unable to mute the member because: \n`" + err + "`"
          );

        interaction.editReply({ embeds: [embed] });
        console.error(err);
      });
  },
};
