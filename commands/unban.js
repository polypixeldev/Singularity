module.exports = {
  name: "unban",
  description: "Unbans the tagged user",
  defaultPermission: true,
  options: [
    {
      name: "tag",
      description:
        'The tag of the user you want to unban, or "list" to see a list of banned users',
      type: "STRING",
      required: true,
    },
    {
      name: "reason",
      description: `The reason for unbanning this user - defaults to "Unbanned by <your tag>" if omitted}`,
      type: "STRING",
      required: false,
    },
  ],
  type: "mod",
  args: ["<user#tag to unban>", "!<reason>"],
  aliases: [],
  example: "unban @poly not spamming",
  notes: "user must be tagged in form user#tag",
  async execute(client, Discord, msg, args) {
    const bans = await msg.guild.bans.fetch();
    if (args[0] === "list") {
      let banArr = bans.map((banInfo) => banInfo.user.tag);
      let banListStr = "";

      for (let ban of banArr) {
        banListStr = banListStr + ` **- ${ban}** \n`;
      }

      if (banListStr === "") {
        const embed = new Discord.MessageEmbed()
          .setColor(0x000000)
          .setDescription("No users are banned in this server!");

        return msg.channel.send({ embeds: [embed] });
      }

      const listEmbed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setTitle(`Bans for ${msg.guild.name}`)
        .setDescription(banListStr)
        .setFooter(
          `Ban list requested by ${msg.author.tag}`,
          msg.author.displayAvatarURL()
        );

      return msg.channel.send({ embeds: [listEmbed] });
    }

    const banInfo = bans.find((ban) => ban.user.tag === args[0]);

    args.shift();
    const reason = args.join(" ");

    if (banInfo) {
      const user = banInfo.user;
      if (
        !msg.member.permissions.has("BAN_MEMBERS") &&
        !msg.member.permissions.has("ADMINISTRATOR")
      ) {
        const permsEmbed = new Discord.MessageEmbed()
          .setDescription("You do not have permissions to unban!")
          .setColor(0x000000);

        return msg.channel.send({ embeds: [permsEmbed] });
      }

      msg.guild.members
        .unban(
          user,
          reason ? reason : `${user.tag} unbanned by ${msg.author.tag}`
        )
        .then(() => {
          const successEmbed = new Discord.MessageEmbed()
            .setDescription(`Successfully unbanned **${user.tag}**`)
            .setColor(0x000000);

          msg.channel.send({ embeds: [successEmbed] });
        })
        .catch((err) => {
          if (err.message === "Missing Permissions") {
            const embed = new Discord.MessageEmbed()
              .setColor(0x000000)
              .setDescription("I don't have permissions to unban this user!");

            return msg.channel.send({ embeds: [embed] });
          }

          const errEmbed = new Discord.MessageEmbed().setDescription(
            "I was unable to unban the member because: \n`" + err + "`"
          );

          msg.channel.send({ embeds: [errEmbed] });

          console.log(err);
        });
    } else {
      const mentionEmbed = new Discord.MessageEmbed()
        .setDescription("The tagged user is not banned!")
        .setColor(0x000000);

      msg.channel.send({ embeds: [mentionEmbed] });
    }
  },
  async slashExecute(client, Discord, interaction) {
    await interaction.deferReply({ ephemeral: true });
    const bans = await interaction.guild.bans.fetch();
    if (interaction.options.get("tag").value === "list") {
      if (!interaction.member.permissions.has("BAN_MEMBERS")) {
        const embed = new Discord.MessageEmbed()
          .setColor(0x000000)
          .setDescription("You do not have permission to view the ban list!");

        return interaction.editReply({ embeds: [embed] });
      }
      let banArr = bans.map((banInfo) => banInfo.user.tag);
      let banListStr = "";

      for (let ban of banArr) {
        banListStr = banListStr + ` **- ${ban}** \n`;
      }

      if (banListStr === "") {
        const embed = new Discord.MessageEmbed()
          .setColor(0x000000)
          .setDescription("No users are banned in this server!");

        return interaction.editReply({ embeds: [embed] });
      }

      const listEmbed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setTitle(`Bans for ${interaction.guild.name}`)
        .setDescription(banListStr)
        .setFooter(
          `Ban list requested by ${interaction.user.tag}`,
          interaction.user.displayAvatarURL()
        );

      return interaction.editReply({ embeds: [listEmbed] });
    }

    const banInfo = bans.find(
      (ban) => ban.user.tag === interaction.options.get("tag").value
    );

    const reason = interaction.options.get("reason")?.value;

    if (banInfo) {
      const user = banInfo.user;
      if (
        !interaction.member.permissions.has("BAN_MEMBERS") &&
        !interaction.member.permissions.has("ADMINISTRATOR")
      ) {
        const permsEmbed = new Discord.MessageEmbed()
          .setDescription("You do not have permissions to unban!")
          .setColor(0x000000);

        return interaction.editReply({ embeds: [permsEmbed] });
      }

      interaction.guild.members
        .unban(
          user,
          reason ?? `${user.tag} unbanned by ${interaction.user.tag}`
        )
        .then(() => {
          const successEmbed = new Discord.MessageEmbed()
            .setDescription(`Successfully unbanned **${user.tag}**`)
            .setColor(0x000000);

          interaction.editReply({ embeds: [successEmbed] });
        })
        .catch((err) => {
          if (err.message === "Missing Permissions") {
            const embed = new Discord.MessageEmbed()
              .setColor(0x000000)
              .setDescription("I don't have permissions to unban this user!");

            return interaction.editReply({ embeds: [embed] });
          }

          const errEmbed = new Discord.MessageEmbed().setDescription(
            "I was unable to unban the member because: \n`" + err + "`"
          );

          interaction.editReply({ embeds: [errEmbed] });

          console.log(err);
        });
    } else {
      const mentionEmbed = new Discord.MessageEmbed()
        .setDescription("The tagged user is not banned!")
        .setColor(0x000000);

      interaction.editReply({ embeds: [mentionEmbed] });
    }
  },
};
