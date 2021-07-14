module.exports = {
    name: 'clear',
    description: "Clear messages",
    type: 'mod',
    args: ['<# of messages to clear> '],
    aliases: ['purge', 'delete'],
    example: 'clear 100',
    execute(client, Discord, msg, args) {
        if(!msg.member.hasPermission('ADMINISTRATOR')){
            const embed = new Discord.MessageEmbed()
            .setDescription('You do not have permission to clear messages!')
            .setColor(0x000000);
            return msg.channel.send(embed);
        }

        if(!args[0]){
            const embed = new Discord.MessageEmbed()
            .setColor(0x000000)
            .setDescription('Please enter the amount of messages you wish to clear!');
            return msg.channel.send(embed);
        } 

        if(isNaN(args[0])){
            const embed = new Discord.MessageEmbed()
            .setColor(0x000000)
            .setDescription('Please enter an actual number!');
            return msg.channel.send(embed);
        } 

        if(args[0] > 100){
            const embed = new Discord.MessageEmbed()
            .setColor(0x000000)
            .setDescription('You are not able to delete over 100 messages at a time!');
            return msg.channel.send(embed);
        } 

        if(args[0] < 1){
            const embed = new Discord.MessageEmbed()
            .setColor(0x000000)
            .setDescription('You must delete at least one message!');
            return msg.channel.send(embed);
        } 
        
          msg.channel.messages.fetch({limit: Math.floor(args[0])}).then(messages =>{
             msg.channel.bulkDelete(messages).then(async()=>{
                 const embed = new Discord.MessageEmbed()
                 .setDescription(`Successfully cleared \`${args[0]}\` messages!`)
                 .setColor(0x000000);

                msg.channel.send(embed);
            }, ()=>{
                const embed = new Discord.MessageEmbed()
                .setDescription('At this time, you cannot delete messages that are over 14 days old.')
                .setColor(0x000000);
                
                msg.channel.send(embed);

                return;
            })
        });
    }
}