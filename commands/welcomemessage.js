module.exports = {
    name: 'welcomemessage',
    description: "Sets the server welcome message",
    type: 'mod',
    args: ['<channel name to send the message in>', '<message to send>'],
    aliases: [],
    example: 'welcomemessage welcome Welcome to the server, {member-mention}!',
    notes: 'cannot be channel mention, only channel name - In message, you may use the following placeholders: {member-mention}, {member-name}, and/or {member.tag}',
    async execute(client, Discord, msg, args, serverModel){
        const welcomeChannelName = args.shift();
        const welcomeChannel = msg.guild.channels.cache.find(ch => ch.name === welcomeChannelName);
        const serverDoc = await serverModel.findOne({guildID: msg.guild.id});
        if(!welcomeChannel){
          await msg.channel.send('That is not a valid channel name!');
          return;
        }
        const welcomeMessage = args.join(' ');
        serverDoc.welcomeMessage = welcomeMessage;
        serverDoc.welcomeChannelName = welcomeChannelName;

        await serverDoc.save(function(err){
          if(err !== null && err){
            const errEmbed = new Discord.MessageEmbed()
            .setColor(0x000000)
            .setDescription(`Uhoh, an error occured when recieving changing the prefix. If this issue persists, DM poly#3622 with a screenshot of this message. \n \n \`Error:\` \n \`\`\`${err}\`\`\``);
            return msg.channel.send(errEmbed);
          }
        });

        const successEmbed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setDescription(`Server welcome message successfully changed to \`${welcomeMessage}\` in channel \`${welcomeChannelName}\``)
        msg.channel.send(successEmbed);
    }
}