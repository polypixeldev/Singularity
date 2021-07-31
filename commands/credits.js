module.exports = {
    name: 'credits',
    description: 'Credits to the makers of this bot',
    type: 'general',
    args: [],
    aliases: ['c'],
    example: 'credits',
    execute(client, Discord, msg){
        const embed = new Discord.MessageEmbed()
        .setTitle('Singularity Credits')
        .setColor(0x000000)
        .setDescription(`This bot was made by **poly#3622** and **Redstone#1165** using the **Discord.js** module and a **MongoDB** database \n \n **Improve Singularity!** Singularity is open-source! Check out the repository on GitHub at https://github.com/Poly-Pixel/Singularity and join the support server at https://discord.gg/Q5GbzpXgSz`)
        .setFooter(`Credits requested by ${msg.author.tag}`, msg.author.displayAvatarURL());
        
        msg.channel.send(embed);
    }
}