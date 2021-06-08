module.exports = {
    name: 'reactionrole',
    description: "Instantiates a new reaction role",
    type: 'mod',
    async execute(msg, args, serverModel, Discord){
        const reactionChannel = msg.channel.guild.channels.cache.find(ch => ch.name === 'reaction-roles');
        const emoji = args.shift();
        const roleName = args.shift();
        const messageSend = args.join(' ');

        const serverDoc = await serverModel.findOne({guildID: msg.guild.id});

        reactionChannel.send(messageSend).then(sent => {
          sent.react(emoji);
          serverDoc.reactionroles.push([roleName, emoji, sent.id]);
        });

        await serverDoc.save(function(err){
          if(err !== null && err){
            const errEmbed = new Discord.MessageEmbed()
            .setColor(0x000000)
            .setDescription(`Uhoh, an error occured when recieving this message. If this issue persists, DM poly#3622 with a screenshot of this message. \n \n \`Error:\` \n \`\`\`${err}\`\`\``);
            return msg.channel.send(errEmbed);
          }
        })

        const successEmbed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setDescription('Reaction role added!');
        return msg.channel.send(successEmbed);
    }
}