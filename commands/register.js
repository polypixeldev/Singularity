module.exports = {
    name: 'register',
    description: "Registers you into the profile system",
    type: 'perks',
    execute(msg, fs, Discord, configArr){
        configArr[1][msg.author.id] = {
            name: msg.author.username,
            discriminator: msg.author.discriminator,
            tag: msg.author.tag
          }

          fs.writeFileSync('config.json', JSON.stringify(configArr, null, 2));

          const embed = new Discord.MessageEmbed()
          .setColor(0x000000)
          .setDescription('You are now registered into the profile system!');
          
          msg.channel.send(embed);
    }
}