module.exports = (client, Discord, msg, args, serverDoc) => {
        if(args.length === 0){
          if(serverDoc.welcomeChannelID !== 'none'){
            client.utils.updateServer(client, msg.guild.id, {
              welcomeChannelID: 'none'
            });

            const embed = new Discord.MessageEmbed()
            .setColor(0x000000)
            .setDescription('Welcome messages are now toggled off. To turn them on again, run this command with the appropriate arguments.');

            return msg.channel.send(embed);
          } else {
            const embed = new Discord.MessageEmbed()
            .setColor(0x000000)
            .setDescription('Welcome messages are currently toggled off. To turn them on, run this command with the appropriate arguments.');

            return msg.channel.send(embed);
          }
        }
        
        let welcomeChannelID = args.shift();
        let welcomeChannel = msg.guild.channels.cache.find(ch => ch.name === welcomeChannelID);
        if(!welcomeChannel){
          const channelRegex = /<#\d{18}>/;
          if(channelRegex.test(welcomeChannelID)){
            welcomeChannel = msg.guild.channels.resolve(welcomeChannelID.slice(2, welcomeChannelID.length - 1));
          } else {
            const embed = new Discord.MessageEmbed()
            .setColor(0x000000)
            .setDescription('That is not a valid channel name!');
            return msg.channel.send(embed);
          }
        }

        const welcomeMessage = args.join(' ');
        if(welcomeMessage === ""){
          const embed =  new Discord.MessageEmbed()
          .setColor(0x000000)
          .setDescription('Please enter a welcome message! If you want to turn welcome messages off, just send this command with no arguments.');
          return msg.channel.send(embed);
        }

        client.utils.updateServer(client, msg.guild.id, {
          welcomeMessage: welcomeMessage,
          welcomeChannelID: welcomeChannel.id
        }).then(() => {
          const successEmbed = new Discord.MessageEmbed()
          .setColor(0x000000)
          .setDescription(`Server welcome message successfully changed to \`${welcomeMessage}\` in channel \`#${welcomeChannel.name}\``)
          msg.channel.send(successEmbed);
        });
    }