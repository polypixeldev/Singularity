module.exports = {
    name: 'reactionrole',
    description: "Instantiates a new reaction role",
    type: 'mod',
    async execute(msg, args, serverModel, Discord){
        const reactionChannel = msg.channel;
        const emoji = args.shift();
        const roleName = args.shift();
        const messageSend = args.join(' ');

        const serverDoc = await serverModel.findOne({guildID: msg.guild.id});
        let sentMessage;
        await reactionChannel.send(messageSend).then(sent => {
          sentMessage = sent;
          serverDoc.reactionRoles.set(serverDoc.reactionRoles.length, [roleName, emoji, sent.id]);
          serverDoc.markModified('reactionRoles');
          console.log(serverDoc.reactionRoles);
        });
        await serverModel.updateOne({guildID: msg.guild.id}, {reactionRoles: serverDoc.reactionRoles});
        /*
        await serverDoc.save(function(err){
          if(err !== null && err){
            const errEmbed = new Discord.MessageEmbed()
            .setColor(0x000000)
            .setDescription(`Uhoh, an error occured when recieving this message. If this issue persists, DM poly#3622 with a screenshot of this message. \n \n \`Error:\` \n \`\`\`${err}\`\`\``);
            return msg.channel.send(errEmbed);
          }
        })
        */
       sentMessage.react(emoji);
        const successEmbed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setDescription('Reaction role added!');
        return msg.channel.send(successEmbed);
    }
}