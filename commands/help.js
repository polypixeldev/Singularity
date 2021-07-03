module.exports = {
    name: 'help',
    description: "Singularity Help",
    type: 'general',
    args: ['!<command type>'],
    aliases: [],
    example: 'help general',
    execute(client, Discord, msg, args, serverModel, prefix){
        let general_commands = [];
        let mod_commands = [];
        let ms_commands = [];

        for(let command of client.commands){
            if(command[1].type === 'general'){
                general_commands.push(`\`${prefix}${command[1].name}\` - ${command[1].description} \n `);
            } else if (command[1].type === 'mod'){
                mod_commands.push(`\`${prefix}${command[1].name}\` - ${command[1].description} \n `);
            } else if(command[1].type === 'ms'){
                ms_commands.push(`\`${prefix}${command[1].name}\` - ${command[1].description} \n `);
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
       } else if(args[0] === 'ms') {
        const embed = new Discord.MessageEmbed()
        .setTitle('My Singularity Commands')
        .setColor(0x000000)
        .setDescription(ms_commands.join(' '))
        .setFooter(`My Singularity help requested by ${msg.author.tag}`, msg.author.displayAvatarURL());

        msg.channel.send(embed);
       } else {
        const embed = new Discord.MessageEmbed() 
        .setTitle('Singularity Help')
        .setColor(0x000000)
        .setDescription(`**This server's prefix is:** \`${prefix}\` \n \n **General Command Help:** \`${prefix}help general\` \n \n **Moderation Command Help:** \`${prefix}help mod\` \n \n **My Singularity Help:** \`${prefix}help ms\` \n \n **Improve Singularity!** Singularity is open-source! Check out the repository on github at https://github.com/Poly-Pixel/Singularity and join the support server at https://discord.gg/Q5GbzpXgSz`)
        .setFooter(`Help requested by ${msg.author.tag}`, msg.author.displayAvatarURL());

        msg.channel.send(embed);
       }
    }
}