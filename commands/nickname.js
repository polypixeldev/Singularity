module.exports =  {
    name: 'nickname',
    description: 'Sets the mentioned user\'s nickname to the specified nickname',
    type: 'mod',
    args: ['<target user>', '<new nickname>'],
    aliases: [],
    example: 'nickname @poly Bot Maker',
    notes: 'user must be mentioned',
    execute(client, Discord, msg, args){
        if(!msg.member.hasPermission('ADMINISTRATOR')){
            const embed = new Discord.MessageEmbed()
            .setColor(0x000000)
            .setDescription('You do not have permission to set the nickname of others!');

            return msg.channel.send({embeds: [embed]});
        }
        if(!args[1]) args[1] === null;

        let user = msg.mentions.users.first();

        if (!user) {
            user = client.utils.resolveTag(msg.guild, args[0])
            if(!user){
                user = client.user;
                args[1] = args[0];
            }
        }

        const member = msg.guild.members.resolve(user);

        if(member.hasPermission('ADMINISTRATOR') && user.id !== '860552124064202812'){
            const permsEmbed = new Discord.MessageEmbed()
            .setDescription('You cannot nickname a moderator!')
            .setColor(0x000000);

            return msg.channel.send({embeds: [permsEmbed]});
        }

        const prevName = member.nickname;

        const nicknameFunc = args => {args.shift(); return args;}
        const nicknameSet = nicknameFunc(args);

        member.setNickname(nicknameSet.join(' '))
        .then(() => {
            const embed = new Discord.MessageEmbed()
            .setColor(0x000000)
            .setDescription(`Name changed from \`${prevName === null || prevName === '' ? 'None' : prevName}\` to \`${nicknameSet.join(' ') === null || nicknameSet.join(' ') === '' ? 'None': nicknameSet.join(' ')}\``);

            msg.channel.send({embeds: [embed]});
        })
        .catch(async err => {
            if(err == 'DiscordAPIError: Missing Permissions'){
                const errPermsEmbed = new Discord.MessageEmbed()
                .setDescription('Uh oh! I don\'t have permission to nickname this user!')
                .setColor(0x000000);

                return msg.channel.send({embeds: [errPermsEmbed]});
            } else {
                const errEmbed = new Discord.MessageEmbed()
                .setColor(0x000000)
                .setDescription(`I was unable to change the member's nickname because: \n \`${err}\``);
            
                return msg.channel.send({embeds: [errEmbed]});
            }
        });
    }
}