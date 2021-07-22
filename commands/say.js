module.exports = {
    name: 'say',
    description: "The bot says the message you pass in",
    type: 'general',
    args: ['<message to repeat'],
    aliases: [],
    example: 'say I am Singularity',
    execute(client, Discord, msg, args){
        if(args.length === 0){
            const embed = new Discord.MessageEmbed()
            .setColor(0x000000)
            .setDescription('Please enter a message for me to say!');

            return msg.channel.send(embed);
        }
        msg.channel.send(args.join(' ')).then(() => {
            msg.delete();
        })
    }
}