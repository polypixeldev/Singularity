module.exports = {
    name: 'mysingularity',
    description: 'Provides information about My Singularity',
    type: 'ms',
    args: [],
    aliases: ['ms'],
    example: 'mysingularity',
    notes: '',
    execute(msg, args, Discord){
        const embed = new Discord.MessageEmbed()
        .setTitle('My Singularity')
        .setColor(0x000000)
        .setFooter(`My Singularity info requested by ${msg.author.tag}`, msg.author.displayAvatarURL())
        .setDescription('');
        msg.channel.send(embed);
    }
}