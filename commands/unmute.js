module.exports = {
    name: 'unmute',
    description: "Unmutes the mentioned user",
    type: 'mod',
    args: ['<user to unmute>'],
    aliases: [],
    example: 'unmute @poly',
    notes: 'user must be mentioned',
    execute(client, Discord, msg, args){
      let user = msg.mentions.users.first();
      if(!user){
        user = client.utils.resolveTag(msg.guild, args[0])
      }
      if (user) {
        const member = msg.guild.members.resolve(user);
        const unmuter = msg.guild.members.resolve(msg.author);
        if (member) {
          if(!unmuter.hasPermission('MUTE_MEMBERS')){
            const permsEmbed = new Discord.MessageEmbed()
            .setDescription('You do not have permission to unmute!')
            .setColor(0x000000);
            return msg.channel.send({embeds: [permsEmbed]});
          }
          const unmuteRole = msg.guild.roles.cache.find(role => role.name === "Muted");
          member
            .roles.remove(unmuteRole, args[1])
            .then(() => {
              const embed = new Discord.MessageEmbed()
              .setColor(0x000000)
              .setDescription(`Successfully unmuted **${user.tag}**`);

              msg.channel.send({embeds: [embed]})
            })
            .catch(err => {
              const embed = new Discord.MessageEmbed()
              .setColor(0x000000)
              .setDescription('I was unable to unmute the member because: \n`' + err + "`");

              msg.channel.send({embeds: [embed]})
              console.error(err);
            });
        } else {
          const embed = new Discord.MessageEmbed()
          .setColor(0x000000)
          .setDescription("That user isn't in this guild!");

          msg.channel.send({embeds: [embed]})
        }
      } else {
        const embed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setDescription("You didn't mention the user to unmute!");

        msg.channel.send({embeds: [embed]})
      }
    }
}