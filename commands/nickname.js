module.exports =  {
    name: 'nickname',
    description: 'Sets the mentioned user\'s nickname to the specified nickname',
    type: 'mod',
    args: ['<target user>', '<new nickname>'],
    aliases: [],
    example: 'nickname @poly Bot Maker',
    notes: 'user must be mentioned',
    async execute(client, Discord, msg, args){
        if(!args[1]){
            const embed = new Discord.MessageEmbed()
            .setDescription('Please provide a username to set')
            .setColor(0x000000)

            return msg.channel.send(embed);
        }

        const user = msg.mentions.users.first();

        if (user) {
          const member = msg.guild.members.resolve(user);

          if(member.hasPermission('ADMINISTRATOR')){
            const permsEmbed = new Discord.MessageEmbed()
            .setDescription('You cannot nickname a moderator!')
            .setColor(0x000000);

            return msg.channel.send(permsEmbed);
          }
          const prevName = member.nickname;

          let errored = false;

          const nicknameFunc = args => {args.shift(); return args;}
          const nicknameSet = nicknameFunc(args);

        member.setNickname(nicknameSet.join(' ')).catch(async err => {
            errored = true;

            if(err == 'DiscordAPIError: Missing Permissions'){
                const errPermsEmbed = new Discord.MessageEmbed()
                .setDescription('Uh oh! I don\'t have permission to manage nicknames!')
                .setColor(0x000000);

                return msg.channel.send(errPermsEmbed);
            } else {
                const errEmbed = new Discord.MessageEmbed()
                .setColor(0x000000)
                .setDescription(`I was unable to change the member's nickname because: \n \`${err}\``);
            
                return msg.channel.send(errEmbed);
            }
            });

            if(errored !== true){
                const embed = new Discord.MessageEmbed()
                .setColor(0x000000)
                .setDescription(`Name changed from \`${prevName}\` to \`${nicknameSet.join(' ')}\``);

                msg.channel.send(embed);
            }
        } else {
            const embed = new Discord.MessageEmbed()
            .setColor(0x000000)
            .setDescription('Please provide a user to set the nickname of');
            msg.channel.send(embed);
        }
        
        
    }
}