module.exports = {
  name: "unmute",
  description: "Unmutes the mentioned user",
  defaultPermission: true,
  options: [
    {
      name: "user",
      description: "The user you want to unmute",
      type: "USER",
      required: true,
    },
    {
      name: "reason",
      description:
        'The reason for unmuting this user - defaults to "Unmuted by <your tag>" if omitted',
      type: "STRING",
      required: false,
    },
  ],
  type: "mod",
  args: ["<user to unmute>"],
  aliases: [],
  example: "unmute @poly",
  notes: "user must be mentioned",
  execute(client, Discord, msg, args) {
    let user = msg.mentions.users.first();
    if (!user) {
      user = client.utils.resolveTag(msg.guild, args[0]);
    }
    if (user) {
      const member = msg.guild.members.resolve(user);
      if (!member.roles.cache.find((role) => role.name === "Muted")) {
        const embed = new Discord.MessageEmbed()
          .setDescription("This member is not muted!")
          .setColor(0x000000);

        return msg.channel.send({ embeds: [embed] });
      }
      const unmuter = msg.guild.members.resolve(msg.author);
      if (member) {
        if (!unmuter.permissions.has("MUTE_MEMBERS")) {
          const permsEmbed = new Discord.MessageEmbed()
            .setDescription("You do not have permission to unmute!")
            .setColor(0x000000);
          return msg.channel.send({ embeds: [permsEmbed] });
        }
        const unmuteRole = msg.guild.roles.cache.find(
          (role) => role.name === "Muted"
        );
        member.roles
          .remove(unmuteRole, args[1])
          .then(() => {
            const embed = new Discord.MessageEmbed()
              .setColor(0x000000)
              .setDescription(`Successfully unmuted **${user.tag}**`);

            msg.channel.send({ embeds: [embed] });
          })
          .catch((err) => {
            const embed = new Discord.MessageEmbed()
              .setColor(0x000000)
              .setDescription(
                "I was unable to unmute the member because: \n`" + err + "`"
              );

            msg.channel.send({ embeds: [embed] });
            console.error(err);
          });
      } else {
        const embed = new Discord.MessageEmbed()
          .setColor(0x000000)
          .setDescription("That user isn't in this guild!");

        msg.channel.send({ embeds: [embed] });
      }
    } else {
      const embed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setDescription("You didn't mention the user to unmute!");

      msg.channel.send({ embeds: [embed] });
    }
  },
  async slashExecute(client, Discord, interaction) {
    await interaction.deferReply();
    let user = interaction.options.get("user").user;

    const member = interaction.guild.members.resolve(user);

    if (!member.roles.cache.find((role) => role.name === "Muted")) {
      const embed = new Discord.MessageEmbed()
        .setDescription("This member is not muted!")
        .setColor(0x000000);

      return interaction.editReply({ embeds: [embed] });
    }

    const unmuter = interaction.member;
    if (!unmuter.permissions.has("MUTE_MEMBERS")) {
      const permsEmbed = new Discord.MessageEmbed()
        .setDescription("You do not have permission to unmute!")
        .setColor(0x000000);
      return interaction.editReply({ embeds: [permsEmbed] });
    }
    const unmuteRole = interaction.guild.roles.cache.find(
      (role) => role.name === "Muted"
    );
    member.roles
      .remove(
        unmuteRole,
        interaction.options.get("reason")?.value ??
          `User unmuted by ${interaction.user.tag}`
      )
      .then(() => {
        const embed = new Discord.MessageEmbed()
          .setColor(0x000000)
          .setDescription(`Successfully unmuted **${user.tag}**`);

        interaction.editReply({ embeds: [embed] });
      })
      .catch((err) => {
        const embed = new Discord.MessageEmbed()
          .setColor(0x000000)
          .setDescription(
            "I was unable to unmute the member because: \n`" + err + "`"
          );

        interaction.editReply({ embeds: [embed] });
        console.error(err);
      });
  },
};
