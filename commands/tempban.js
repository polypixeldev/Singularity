module.exports = {
    name: 'tempban',
    description: "Bans the mentioned user for the specified amount of days",
    type: 'mod',
    args: ['<user to ban>', '!<number of days>'],
    aliases: [],
    example: 'ban @poly 14',
    notes: 'number of days cannot be longer than 14 - if days are ommitted, mentioned user will be banned until unban',
    async execute(msg, args, Discord){
        const user = msg.mentions.users.first();
        if (user) {
          const member = msg.guild.members.resolve(user);
          if(member.hasPermission('ADMINISTRATOR')){
            const permsEmbed = new Discord.MessageEmbed()
            .setDescription('You cannot ban a moderator!')
            .setColor(0x000000);
            await msg.channel.send(permsEmbed);
            return;
          }
          const banner = msg.guild.members.resolve(msg.author);
          if (member) {
            if(!banner.hasPermission('BAN_MEMBERS')){
              const permsEmbed = new Discord.MessageEmbed()
              .setDescription('You do not have permission to ban!')
              .setColor(0x000000);
              await msg.channel.send(permsEmbed);
              return;
            }
            if(isNaN(msg.content[msg.content.length - 1])){
              await member
              .ban({reason: `User banned by: ${msg.author.tag}`})
              .then(() => {
                msg.channel.send(`Successfully banned **${user.tag}**`);
              })
              .catch(err => {
                msg.channel.send('I was unable to ban the member because: \n`' + err + "`");
                console.error(err);
              });
              return;
            }
            member
              .ban({days: msg.content[msg.content.length - 1], reason: `User banned by: ${msg.author.tag}`})
              .then(() => {
                msg.channel.send(`Successfully banned **${user.tag}**`);
              })
              .catch(err => {
                msg.channel.send('I was unable to ban the member because: \n`' + err + "`");
                console.error(err);
              });
          } else {
            msg.channel.send("That user isn't in this guild!");
          }
        } else {
          msg.channel.send("You didn't mention the user to ban!");
        }
    }
}