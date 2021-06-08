module.exports = {
    name: 'profile',
    description: "Responds with the profile of the mentioned user",
    type: 'perks',
    execute(msg, configArr, Discord){
        let person = msg.mentions.users.first();

        if(!person){
          person = msg.author;
        }

        let description = "";

        if(!configArr[1][person.id]){
          const embed = new Discord.MessageEmbed()
          .setDescription('That person is not registered!')
          .setColor(0x000000);
          return msg.channel.send(embed);
        }

        for(const property in configArr[1][person.id]){
          description = description + ` \n ${property}: ${configArr[1][person.id][property]}`;
        }

        const embed = new Discord.MessageEmbed()
        .setTitle(`${person.tag}'s Profile:`)
        .setColor(0x000000)
        .setDescription(description)
        .setImage(person.displayAvatarURL())
        .setFooter(`${person.tag}'s profile requested by ${msg.author.tag}`, msg.author.displayAvatarURL());
        
        msg.channel.send(embed);
    }
}