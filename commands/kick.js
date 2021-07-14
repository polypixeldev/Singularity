module.exports = {
    name: 'kick',
    description: "Kicks the mentioned user",
    type: 'mod',
    args: ['<user to kick>', '!<reason>'],
    aliases: [],
    example: 'kick @poly spamming',
    notes: 'user must be a mention',
    execute(client, Discord, msg, args){
        const user = msg.mentions.users.first();

        args.shift();
        const reason = args.join(' ');

        if (user) {
          const member = msg.guild.members.resolve(user);
          if(member.hasPermission('ADMINISTRATOR')){
            const permsEmbed = new Discord.MessageEmbed()
            .setDescription('You cannot kick a moderator!')
            .setColor(0x000000);
            return msg.channel.send(permsEmbed);
          }
          
          const kicker = msg.guild.members.resolve(msg.author);

          if (member) {
            if(!kicker.hasPermission('KICK_MEMBERS') && !kicker.hasPermission('ADMINISTRATOR')){
              const permsEmbed = new Discord.MessageEmbed()
              .setDescription('You do not have permissions to kick!')
              .setColor(0x000000);

              return msg.channel.send(permsEmbed);
            }

            member
              .kick(reason)
              .then(() => {
                const successEmbed = new Discord.MessageEmbed()
                .setDescription(`Successfully kicked **${user.tag}**`)
                .setColor(0x000000);

                msg.channel.send(successEmbed);
              })
              .catch(err => {
                const errEmbed = new Discord.MessageEmbed()
                .setDescription('I was unable to kick the member because: \n`' + err + "`");
                msg.channel.send(errEmbed);

                console.log(err);
              });
          } else {
            const naEmbed = new Discord.MessageEmbed()
            .setDescription('That user isn\'t in this server!')
            .setColor(0x000000);

            msg.channel.send(naEmbed);
          }
        } else {
          const mentionEmbed = new Discord.MessageEmbed()
          .setDescription('You didn\'t mention the user to kick!')
          .setColor(0x000000);

          msg.channel.send(mentionEmbed);
        }
    }
}