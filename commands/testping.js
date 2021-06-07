module.exports = {
    name: 'testping',
    description: 'testping',
    type: 'general',
    execute(message){
        const ping = Date.now() - message.createdTimestamp;
        if(ping > 1000){
            message.channel.send(`Error: ping is over 1000 (${ping}ms)`);
        } else {
            message.channel.send(`Bot is fast! Ping is ${ping}ms`);
        }
    }
}