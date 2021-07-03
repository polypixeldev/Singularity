module.exports = {
    name: 'test',
    description: "testing command",
    type: 'general',
    execute(client, Discord, msg){
        const embed = new Discord.MessageEmbed()
        .setDescription('Test passed!')
        .setColor(0x000000);
        msg.channel.send(embed);
    }
}