module.exports = {
    name: 'reactionrole',
    description: "Instantiates a new reaction role",
    type: 'mod',
    execute(msg, args, fs, configArr){
        const reactionChannel = msg.channel.guild.channels.cache.find(ch => ch.name === 'reaction-roles');
        const emoji = args.shift();
        const roleFunc = args.shift();
        const roleToAdd = msg.guild.roles.cache.find((role) => role.name === roleFunc);
        const messageSend = args.join(' ');

        configArr[0][msg.guild.id].reactionroles.push([roleToAdd, emoji]);

        reactionChannel.send(messageSend).then(sent => {
          sent.react(emoji);
        });

        setTimeout(()=>{
          fs.writeFileSync('config.json',  JSON.stringify(configArr, null, 2));
        }, 1000);
    }
}