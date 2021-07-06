module.exports = {
    name: 'welcomemessage',
    description: "Sets the server welcome message",
    type: 'mod',
    args: ['<channel name to send the message in>', '<message to send>'],
    aliases: [],
    example: 'welcomemessage welcome Welcome to the server, {member-mention}!',
    notes: 'cannot be channel mention, only channel name - In message, you may use the following placeholders: {member-mention}, {member-name}, and/or {member.tag}',
    async execute(client, Discord, msg, args, serverDoc){
        const welcomeChannelName = args.shift();
        const welcomeChannel = msg.guild.channels.cache.find(ch => ch.name === welcomeChannelName);
        if(!welcomeChannel){
          await msg.channel.send('That is not a valid channel name!');
          return;
        }
        const welcomeMessage = args.join(' ');
        //serverDoc.welcomeMessage = welcomeMessage;
        //serverDoc.welcomeChannelName = welcomeChannelName;

        await client.utils.updateServer(client, serverDoc, {
          welcomeMessage: welcomeMessage,
          welcomeChannelName: welcomeChannelName
        });

        const successEmbed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setDescription(`Server welcome message successfully changed to \`${welcomeMessage}\` in channel \`${welcomeChannelName}\``)
        msg.channel.send(successEmbed);
    }
}