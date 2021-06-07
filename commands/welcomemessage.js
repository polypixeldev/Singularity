module.exports = {
    name: 'welcomemessage',
    description: "Sets the server welcome message",
    type: 'mod',
    async execute(msg, args, fs, configArr){
        const welcomeChannelName = args.shift();
        const welcomeChannel = msg.guild.channels.cache.find(ch => ch.name === welcomeChannelName);
        if(!welcomeChannel){
          await msg.channel.send('That is not a valid channel name!');
          return;
        }
        const welcomeMessage = args.join(' ');
        configArr[0][msg.guild.id].welcomeMessage = welcomeMessage;
        configArr[0][msg.guild.id].welcomeChannelName = welcomeChannelName;
        const raw = JSON.stringify(configArr, null, 2);
        fs.writeFileSync('config.json', raw);
        msg.channel.send(`Server welcome message successfully changed to \`${welcomeMessage}\` in channel \`${welcomeChannelName}\``);
    }
}