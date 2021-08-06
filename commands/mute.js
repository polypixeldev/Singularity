module.exports = {
    name: 'mute',
    description: "Mutes the mentioned user",
    type: 'mod',
    args: ['<user to mute>'],
    aliases: [],
    example: 'mute @poly',
    notes: 'user must be mentioned',
    async execute(client, Discord, msg, args){
        let user = msg.mentions.users.first();

        if(!user){
          user = client.utils.resolveTag(msg.guild, args[0])
        }

        if(user) {
          const member = msg.guild.members.resolve(user);

          if(member.hasPermission('ADMINISTRATOR')){
            const permsEmbed = new Discord.MessageEmbed()
            .setDescription('You cannot mute a moderator!')
            .setColor(0x000000);

            return msg.channel.send({embeds: [permsEmbed]});
      }

      const muter = msg.guild.members.resolve(msg.author);

      if (member) {
        if(!muter.hasPermission('MUTE_MEMBERS')){
          const permsEmbed = new Discord.MessageEmbed()
          .setDescription('You do not have permissions to mute!')
          .setColor(0x000000);

          return msg.channel.send({embeds: [permsEmbed]});
        }

        let rolesize; 
        msg.guild.roles.fetch().then(roles => rolesize = roles.cache.size);

        let muteRole = member.guild.roles.cache.find(rl => rl.name === 'Muted');

        if(!muteRole){
          const aGuild = client.guilds.resolve(msg.channel);
          await aGuild.roles.create({data:{
            name: 'Muted',
            color: '#FFFFFF',
            hoist: true,
            position: rolesize,
            permissions: 66560,
            mentionable: false
            }, reason: 'mute role'});

          muteRole = member.guild.roles.cache.find(rl => rl.name === 'Muted');
        }

          member
          .roles.add(muteRole, args[1])
          .then(() => {
            const embed = new Discord.MessageEmbed()
            .setColor(0x000000)
            .setDescription(`Successfully muted **${user.tag}**`);

            msg.channel.send({embeds: [embed]});
          })
          .catch(err => {
            const embed = new Discord.MessageEmbed()
            .setColor(0x000000)
            .setDescription('I was unable to mute the member because: \n`' + err + "`");

            msg.channel.send({embeds: [embed]});
            console.error(err);
          });

      } else {
        const embed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setDescription("That user isn't in this server!");

        msg.channel.send({embeds: [embed]});
      }
    } else {
      const embed = new Discord.MessageEmbed()
      .setColor(0x000000)
      .setDescription("You didn't mention the user to mute!");

      msg.channel.send({embeds: [embed]});
    }
    }
}

