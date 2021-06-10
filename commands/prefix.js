module.exports = {
    name: 'prefix',
    description: "Sets the prefix of the bot",
    type: 'mod',
    args: ['<new prefix>'],
    aliases: [],
    example: 'prefix ?',
    async execute(msg, args, Discord, serverModel){
      if(!args[0]){
        const embed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setDescription('Please enter a prefix!');

        return msg.channel.send(embed);
      }

        if(msg.member.hasPermission('MANAGE_GUILD')){
          const serverDoc = await serverModel.findOne({guildID: msg.guild.id});
          serverDoc.prefix = args[0];
          await serverDoc.save(function(err){
            if(err !== null && err){
              const errEmbed = new Discord.MessageEmbed()
              .setColor(0x000000)
              .setDescription(`Uhoh, an error occured when recieving changing the prefix. If this issue persists, DM poly#3622 with a screenshot of this message. \n \n \`Error:\` \n \`\`\`${err}\`\`\``);
              return msg.channel.send(errEmbed);
            }
          });

            //configArr[0][msg.guild.id].prefix = args[0];
            //fs.writeFileSync('config.json', JSON.stringify(configArr, null, 2));

            const embed = new Discord.MessageEmbed()
            .setColor(0x000000)
            .setDescription(`Prefix set to: \`${args[0]}\``);

            msg.channel.send(embed);
            } else {
              const permsEmbed = new Discord.MessageEmbed()
              .setDescription('You do not have permissions to change my prefix!')
              .setColor(0x000000);
              
              msg.channel.send(permsEmbed);
            }
    }
}