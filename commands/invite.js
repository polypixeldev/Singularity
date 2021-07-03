module.exports = {
    name: 'invite',
    description: "Invite link for Singularity",
    type: 'general',
    args: [],
    aliases: [],
    example: 'invite',
    execute(client, Discord, msg){
    const embed = new Discord.MessageEmbed()
    .setTitle('Singularity Invite Link')
    .setColor(0x000000)
    .setDescription('Invite link for this bot (currently not public): https://discord.com/oauth2/authorize?client_id=835256019336036423&scope=bot&permissions=8')
    .setFooter(`Invite link requested by ${msg.author.tag}`, msg.author.displayAvatarURL());

    msg.reply(embed);
    }
}