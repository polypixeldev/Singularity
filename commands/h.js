module.exports = {
    name: 'h',
    description: "h",
    type: 'general',
    args: [],
    aliases: [],
    example: 'h',
    execute(client, Discord, msg){
        msg.channel.send('h');
    }
}