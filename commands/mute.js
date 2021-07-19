module.exports = {
    name: 'mute',
    description: "Mutes the mentioned user",
    type: 'mod',
    args: ['<user to mute>'],
    aliases: [],
    example: 'mute @poly',
    notes: 'user must be mentioned',
    async execute(client, Discord, msg){
        const user = msg.mentions.users.first();
        if(user) {
          const member = msg.guild.members.resolve(user);

          if(member.hasPermission('ADMINISTRATOR')){
            const permsEmbed = new Discord.MessageEmbed()
            .setDescription('You cannot mute a moderator!')
            .setColor(0x000000);

            return msg.channel.send(permsEmbed);
      }

      const muter = msg.guild.members.resolve(msg.author);

      if (member) {
        if(!muter.hasPermission('MUTE_MEMBERS')){
          const permsEmbed = new Discord.MessageEmbed()
          .setDescription('You do not have permissions to mute!')
          .setColor(0x000000);

          return msg.channel.send(permsEmbed);
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
        console.log(muteRole);

          member
          .roles.add(muteRole)
          .then(() => {
            const embed = new Discord.MessageEmbed()
            .setColor(0x000000)
            .setDescription(`Successfully muted **${user.tag}**`);

            msg.channel.send(embed);
          })
          .catch(err => {
            const embed = new Discord.MessageEmbed()
            .setColor(0x000000)
            .setDescription('I was unable to mute the member because: \n`' + err + "`");

            msg.channel.send(embed);
            console.error(err);
          });

      } else {
        const embed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setDescription("That user isn't in this server!");

        msg.channel.send(embed);
      }
    } else {
      const embed = new Discord.MessageEmbed()
      .setColor(0x000000)
      .setDescription("You didn't mention the user to mute!");

      msg.channel.send(embed);
    }
    }
}

