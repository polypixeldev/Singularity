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
        if(serverDoc.leaveChannelID !== 'none'){
          client.utils.updateServer(client, serverDoc, {
            leaveChannelID: 'none'
          });

          const embed = new Discord.MessageEmbed()
          .setColor(0x000000)
          .setDescription('Leave messages are now toggled off. To turn them on again, run this command with the appropriate arguments.');

          return msg.channel.send(embed);
        } else {
          const embed = new Discord.MessageEmbed()
          .setColor(0x000000)
          .setDescription('Leave messages are currently toggled off. To turn them on, run this command with the appropriate arguments.');

          return msg.channel.send(embed);
        }
      }

      let leaveChannelID = args.shift();
      let leaveChannel = msg.guild.channels.cache.find(ch => ch.name === leaveChannelID);

      if(!leaveChannel){
        const channelRegex = /<#\d{18}>/;
        if(channelRegex.test(leaveChannelID)){
          leaveChannel = msg.guild.channels.resolve(leaveChannelID.slice(2, leaveChannelID.length - 1));
          leaveChannelID = leaveChannel.id;
        } else {
          const embed = new Discord.MessageEmbed()
          .setColor(0x000000)
          .setDescription('That is not a valid channel name!');
          return msg.channel.send(embed);
        }
      }

      const leaveMessage = args.join(' ');

      await client.utils.updateServer(client, serverDoc, {
        leaveMessage: leaveMessage,
        leaveChannelID: leaveChannel.id
      });

      const embed = new Discord.MessageEmbed()
      .setColor(0x000000)
      .setDescription(`Server leave message successfully changed to \`${leaveMessage}\` in channel \`${leaveChannel.name}\``)
      
      msg.channel.send(embed);
    }
}