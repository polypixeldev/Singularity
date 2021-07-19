module.exports = {
    name: 'leavemessage',
    description: "Sets the leave message for the server",
    type: 'mod',
    args: ['<channel name to send the message in>', '<message to send>'],
    aliases: ['lm'],
    example: 'leavemessage goodbye {member-tag} left the server :(',
    notes: 'cannot be channel mention, only channel name - In message, you may use the following placeholders: {member-name} and/or {member-tag}',
    async execute(client, Discord, msg, args, serverDoc){
        if(args.length === 0){
            client.utils.updateServer(client, serverDoc, {
              
            })
        }
        const leaveChannelName = args.shift();
        const leaveChannel = msg.guild.channels.cache.find(ch => ch.name === leaveChannelName);

        if(!leaveChannel){
          let embed = new Discord.MessageEmbed()
          .setColor(0x000000)
          .setDescription('That is not a valid channel name!');
          return msg.channel.send(embed);
        }

        const leaveMessage = args.join(' ');
        //serverDoc.leaveMessage = leaveMessage;
        //serverDoc.leaveChannelName = leaveChannelName;

        await client.utils.updateServer(client, serverDoc, {
          leaveMessage: leaveMessage,
          leaveChannelName: leaveChannelName
        });

        const embed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setDescription(`Server leave message successfully changed to \`${leaveMessage}\` in channel \`${leaveChannelName}\``)
        
        msg.channel.send(embed);
    }
}