module.exports = {
    name: 'exit',
    description: "Shuts down the bot",
    type: 'mod',
    execute(msg, Discord){
        if(msg.author.id === '722092754510807133'){
        msg.channel.send('```Shutting down...```').then(() => {process.exit(1);});
        } else {
            const embed = new Discord.MessageEmbed()
            .setColor(0x000000)
            .setDescription('You do not have permission to shut me down! (This development command will be removed in a future update)');
            
            msg.channel.send(embed);
        }
    }
}