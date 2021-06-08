module.exports = {
    name: 'credits',
    description: 'Credits to the makers of this bot',
    type: 'general',
    execute(msg, args, Discord){
        const embed = new Discord.MessageEmbed()
        .setTitle('Singularity Credits')
        .setColor(0x000000)
        .setDescription(`This bot was made by poly#3622 and Redstone#1165 using the Discord.js library`)
        .setFooter(`Credits requested by ${msg.author.tag}`, msg.author.displayAvatarURL());
        
        msg.channel.send(embed);
    }
}