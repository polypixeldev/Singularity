module.exports = {
    name: 'testping',
    description: 'testping',
    type: 'general',
    execute(client, Discord, msg){
        const ping = Date.now() - msg.createdTimestamp;
        if(ping > 1000){
            msg.channel.send(`Error: ping is over 1000 (${ping}ms)`);
        } else {
            msg.channel.send(`Bot is fast! Ping is ${ping}ms`);
        }
    }
}