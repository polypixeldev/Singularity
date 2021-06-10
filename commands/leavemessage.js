module.exports = {
    name: 'leavemessage',
    description: "Sets the leave message for the server",
    type: 'mod',
    args: ['<channel name to send the message in>', '<message to send>'],
    aliases: [],
    example: 'leavemessage goodbye {member-tag} left the server :(',
    notes: 'cannot be channel mention, only channel name - In message, you may use the following placeholders: {member-name} and/or {member-tag}',
    async execute(msg, args, serverModel, Discord){
        const serverDoc = await serverModel.findOne({guildID: msg.guild.id});
        const leaveChannelName = args.shift();
        const leaveChannel = msg.guild.channels.cache.find(ch => ch.name === leaveChannelName);

        if(!leaveChannel){
          let embed = new Discord.MessageEmbed()
          .setColor(0x000000)
          .setDescription('That is not a valid channel name!');
          return msg.channel.send(embed);
        }

        const leaveMessage = args.join(' ');
        serverDoc.leaveMessage = leaveMessage;
        serverDoc.leaveChannelName = leaveChannelName;

        await serverDoc.save(function(err){
          if(err !== null && err){
            const errEmbed = new Discord.MessageEmbed()
            .setColor(0x000000)
            .setDescription(`Uhoh, an error occured when recieving changing the prefix. If this issue persists, DM poly#3622 with a screenshot of this message. \n \n \`Error:\` \n \`\`\`${err}\`\`\``);
            return msg.channel.send(errEmbed);
          }
        });

        const embed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setDescription(`Server leave message successfully changed to \`${leaveMessage}\` in channel \`${leaveChannelName}\``)
        
        msg.channel.send(embed);
    }
}