module.exports = {
    name: 'ban',
    description: "Bans the mentioned user",
    type: 'mod',
    args: ['<user to ban>', '!<number of days>', 'reason'],
    aliases: ['tempban'],
    example: 'ban @poly 14 Breaking the rules',
    notes: 'number of days cannot be longer than 7 - if days are omitted, mentioned user will be banned indefinitely',
    execute(client, Discord, msg, args){
        let user = msg.mentions.users.first();

        if(!user){
          user = client.utils.resolveTag(msg.guild, args[0]);
        }

        if (user) {
          const member = msg.guild.members.resolve(user);
          if(member.hasPermission('ADMINISTRATOR')){
            const permsEmbed = new Discord.MessageEmbed()
            .setDescription('You cannot ban a moderator!')
            .setColor(0x000000);
            return msg.channel.send({embeds: [permsEmbed]});
          }

          if (member) {
            const banner = msg.guild.members.resolve(msg.author);
            if(!banner.hasPermission('BAN_MEMBERS')){
              const permsEmbed = new Discord.MessageEmbed()
              .setDescription('You do not have permission to ban!')
              .setColor(0x000000);
              return msg.channel.send({embeds: [permsEmbed]});
            }
            
            if(args[1] && isNaN(args[1])){
              return member
              .ban({reason: [args[1]]})
              .then(() => {
                const embed = new Discord.MessageEmbed()
                .setColor(0x000000)
                .setDescription(`Successfully banned **${user.tag}**`)
                return msg.channel.send({embeds: [embed]});
              })
              .catch(err => {
                if(err.message === 'Missing Permissions'){
                  const embed = new Discord.MessageEmbed()
                  .setColor(0x000000)
                  .setDescription('I do not have permissions to ban this user!');

                  return msg.channel.send({embeds: [embed]});
                }

                const embed = new Discord.MessageEmbed()
                .setColor(0x000000)
                .setDescription(`I was unable to ban the member because: \n \`\`\`${err}\`\`\``)
                return msg.channel.send({embeds: [embed]});
              });
            } else if(!args[1]){
              return member
              .ban({reason: `User banned by ${msg.author.tag}`})
              .then(() => {
                const embed = new Discord.MessageEmbed()
                .setColor(0x000000)
                .setDescription(`Successfully banned **${user.tag}**`)
                return msg.channel.send({embeds: [embed]});
              })
              .catch(err => {
                if(err.message === 'Missing Permissions'){
                  const embed = new Discord.MessageEmbed()
                  .setColor(0x000000)
                  .setDescription('I do not have permissions to ban this user!');

                  return msg.channel.send({embeds: [embed]});
                }

                const embed = new Discord.MessageEmbed()
                .setColor(0x000000)
                .setDescription(`I was unable to ban the member because: \n \`\`\`${err}\`\`\``)
                return msg.channel.send({embeds: [embed]});
              });
            } else {
              if(args[1] > 7){
                const embed = new Discord.MessageEmbed()
                .setColor(0x000000)
                .setDescription('You cannot tempban someone for more than 7 days!');

                return msg.channel.send({embeds: [embed]});
              }

              member
              .ban({days: args[1], reason: args[2] ? args[2] : `User banned by ${msg.author.tag}`})
              .then(() => {
                const embed = new Discord.MessageEmbed()
                .setColor(0x000000)
                .setDescription(`Successfully banned **${user.tag}**`)
                return msg.channel.send({embeds: [embed]});
              })
              .catch(err => {
                if(err.message === 'Missing Permissions'){
                  const embed = new Discord.MessageEmbed()
                  .setColor(0x000000)
                  .setDescription('I do not have permissions to ban this user!');

                  return msg.channel.send({embeds: [embed]});
                }

                const embed = new Discord.MessageEmbed()
                .setColor(0x000000)
                .setDescription(`I was unable to ban the member because: \n \`\`\`${err}\`\`\``)
                return msg.channel.send({embeds: [embed]});
              });
            }
          } else {
            const embed = new Discord.MessageEmbed()
            .setColor(0x000000)
            .setDescription("That user isn't in this guild!");
            msg.channel.send({embeds: [embed]});
          }
        } else {
            const embed = new Discord.MessageEmbed()
            .setColor(0x000000)
            .setDescription("You didn't mention the user to ban!");
            msg.channel.send({embeds: [embed]});
        }
    }
}