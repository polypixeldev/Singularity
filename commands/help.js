module.exports = {
    name: 'help',
    description: "Singularity Help",
    type: 'general',
    execute(msg, args, Discord, prefix, client){
        let general_commands = [];
        let mod_commands = [];
        let perks_commands = [];

        for(let command of client.commands){
            if(command[1].type === 'general'){
                general_commands.push(`\`${prefix}${command[1].name}\` - ${command[1].description} \n `);
            } else if (command[1].type === 'mod'){
                mod_commands.push(`\`${prefix}${command[1].name}\` - ${command[1].description} \n `);
            } else if(command[1].type === 'perks'){
                perks_commands.push(`\`${prefix}${command[1].name}\` - ${command[1].description} \n `);
            }
        }

       if(args[0] === 'general'){
        const embed = new Discord.MessageEmbed()
        .setTitle('Singularity General Commands')
        .setColor(0x000000)
        .setDescription(general_commands.join(' '))
        .setFooter(`General help requested by ${msg.author.tag}`, msg.author.displayAvatarURL());

        msg.channel.send(embed);
       } else if(args[0] === 'mod'){
        const embed = new Discord.MessageEmbed()
        .setTitle('Singularity Mod Commands')
        .setColor(0x000000)
        .setDescription(mod_commands.join(' '))
        .setFooter(`Mod help requested by ${msg.author.tag}`, msg.author.displayAvatarURL());

        msg.channel.send(embed);
       } else if(args[0] === 'perks') {
        const embed = new Discord.MessageEmbed()
        .setTitle('Singularity Perks Commands')
        .setColor(0x000000)
        .setDescription(perks_commands.join(' '))
        .setFooter(`Perks help requested by ${msg.author.tag}`, msg.author.displayAvatarURL());

        msg.channel.send(embed);
       } else {
        const embed = new Discord.MessageEmbed() 
        .setTitle('Singularity Help')
        .setColor(0x000000)
        .setDescription(`**This server's prefix is:** \`${prefix}\` \n \n **General Command Help:** \`${prefix}help general\` \n \n **Moderation Command Help:** \`${prefix}help mod\` \n \n **Perk Command Help:** \`${prefix}help perks\``)
        .setFooter(`Help requested by ${msg.author.tag}`, msg.author.displayAvatarURL());

        msg.channel.send(embed);
       }
    }
}