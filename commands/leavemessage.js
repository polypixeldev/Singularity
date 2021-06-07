module.exports = {
    name: 'leavemessage',
    description: "Sets the leave message for the server",
    type: 'mod',
    execute(msg, args, fs, Discord, configArr){
        const leaveChannelName = args.shift();
        const leaveChannel = msg.guild.channels.cache.find(ch => ch.name === leaveChannelName);

        if(!leaveChannel){
          let embed = new Discord.MessageEmbed()
          .setColor(0x000000)
          .setDescription('That is not a valid channel name!');
          return msg.channel.send(embed);
        }

        const leaveMessage = args.join(' ');
        configArr[0][msg.guild.id].leaveMessage = leaveMessage;
        configArr[0][msg.guild.id].leaveChannelName = leaveChannelName;

        const raw = JSON.stringify(configArr, null, 2);
        fs.writeFileSync('config.json', raw);

        const embed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setDescription(`Server leave message successfully changed to \`${leaveMessage}\` in channel \`${leaveChannelName}\``)
        
        msg.channel.send(embed);
    }
}