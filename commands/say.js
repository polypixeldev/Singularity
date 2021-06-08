module.exports = {
    name: 'say',
    description: "The bot says the message you pass in",
    type: 'general',
    execute(msg, args){
        msg.channel.send(args.join(' '));
    }
}