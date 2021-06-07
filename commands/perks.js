module.exports = {
    name: 'perks',
    description: 'perks',
    type: 'perks',
    execute(msg, args, Discord, guildPrefix, configArr){
        const member = msg.guild.members.resolve(msg.author);

        if(args[0] === 'my'){
            const memberItems = configArr[0][msg.guild.id].perks.members[msg.author.id].items;
            const memberPerks = configArr[0][msg.guild.id].perks.members[msg.author.id].perks;
            const points = configArr[0][msg.guild.id].perks.members[msg.author.id].points;

            let embedDescription = `**Perk Points:** \n ${points} \n \n **Your Items:** \n`;

            for(let i=0; i<memberItems.length; i++){
                embedDescription = embedDescription + `- \`${memberItems[i]}\` \n`;
            }
            
            embedDescription = embedDescription + `\n **Your Perks:** \n`;

            for(let j=0; j<memberPerks.length; j++){
                embedDescription = embedDescription + `- \`${memberPerks[j]}\` \n`;
            }

            const embed = new Discord.MessageEmbed()
            .setTitle(`${msg.author.tag}'s Stuff`)
            .setColor(0x000000)
            .setDescription(embedDescription)
            .setFooter(`${msg.author.tag}'s Perks requested by ${msg.author.tag}`, msg.author.displayAvatarURL());
            
            msg.channel.send(embed);
        } else if(args[0] === 'shop'){
            //tba
        } else if(args[0] === 'lb'){
            //tba
        } else {
            const embed = new Discord.MessageEmbed()
            .setTitle('Server Perks')
            .setColor(0x000000)
            .setDescription(`**What are Server Perks?** \n Perk Points (which can be used to unlock and purchase Server Perks) are rewards that *you* can get for being a constructive and active member of the server! Unlike leveling systems, this isn't just showing off - Server Perks gives you rewards that can be used throughout the server. Rewards can be fully customized by administrators as well! To learn more about server perks, visit the Singularity website at http://haha-you-dont-know-the-ip \n \n **Server Perks Commands:** \n \`${guildPrefix}perks\` - Shows this help message \n \`${guildPrefix}perks my\` - Shows your active perks \n \`${guildPrefix}perks shop\` - Shows the perks that you can purchase in the current server \n \`${guildPrefix}perks lb\` - Shows the leaderboard for Perk Points in the current server`)
            .setFooter(`Server Perks info requested by ${member.user.tag}`, member.user.displayAvatarURL());
            
            msg.channel.send(embed);
        }
    }
}