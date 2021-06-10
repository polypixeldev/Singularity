module.exports = {
    name: 'say',
    description: "The bot says the message you pass in",
    type: 'general',
    args: ['<message to repeat'],
    aliases: [],
    example: 'say I am Singularity',
    execute(msg, args){
        msg.channel.send(args.join(' '));
    }
}