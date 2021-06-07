module.exports = {
    name: 'ping',
    description: "Responds with the bot's latency and the API latency",
    type: 'general',
    execute(msg, client, Discord){
        const embed = new Discord.MessageEmbed()
        .setDescription(`🏓 Latency is ${Date.now() - msg.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`)
        .setColor(0x000000);
        
        msg.channel.send(embed);
    }
}