module.exports = {
    name: 'unban',
    description: "Unbans the tagged user",
    type: 'mod',
    args: ['<user#tag to unban>', '!<reason>'],
    aliases: [],
    example: 'unban @poly not spamming',
    notes: 'user must be tagged in form user#tag',
    async execute(client, Discord, msg, args){
      const bans = await msg.guild.fetchBans();
      if(args[0] === 'list'){
        let banArr = bans.map(banInfo => banInfo.user.tag);
        let banListStr = "";

        for(let ban of banArr){
          banListStr = banListStr + ` **- ${ban}** \n`;
        }

        if(banListStr === ""){
          const embed = new Discord.MessageEmbed()
          .setColor(0x000000)
          .setDescription('No users are banned in this server!');

          return msg.channel.send(embed);
        }

        const listEmbed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setTitle(`Bans for ${msg.guild.name}`)
        .setDescription(banListStr)
        .setFooter(`Ban list requested by ${msg.author.tag}`, msg.author.displayAvatarURL());

        return msg.channel.send(listEmbed);
      }

      const banInfo = bans.find(ban => ban.user.tag === args[0]);

      args.shift();
      const reason = args.join(' ');

      if (banInfo) {
          const user = banInfo.user;
          if(!msg.member.hasPermission('BAN_MEMBERS') && !msg.member.hasPermission('ADMINISTRATOR')){
            const permsEmbed = new Discord.MessageEmbed()
            .setDescription('You do not have permissions to unban!')
            .setColor(0x000000);

            return msg.channel.send(permsEmbed);
          }

          msg.guild.members
          .unban(user, reason ? reason : `${user.tag} unbanned by ${msg.author.tag}`)
          .then(() => {
            const successEmbed = new Discord.MessageEmbed()
            .setDescription(`Successfully unbanned **${user.tag}**`)
            .setColor(0x000000);

            msg.channel.send(successEmbed);
          })
          .catch(err => {
            if(err.message === 'Missing Permissions'){
              const embed = new Discord.MessageEmbed()
              .setColor(0x000000)
              .setDescription('I don\'t have permissions to unban this user!');

              return msg.channel.send(embed);
            }

            const errEmbed = new Discord.MessageEmbed()
            .setDescription('I was unable to unban the member because: \n`' + err + "`");

            msg.channel.send(errEmbed);

            console.log(err);
          });
          
        } else {
          const mentionEmbed = new Discord.MessageEmbed()
          .setDescription('The tagged user is not banned!')
          .setColor(0x000000);

          msg.channel.send(mentionEmbed);
        }
    }
}