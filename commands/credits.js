module.exports = {
    name: 'credits',
    description: 'Credits to the makers of this bot',
    defaultPermission: true,
    options: [],
    type: 'general',
    args: [],
    aliases: ['c'],
    example: 'credits',
    execute(client, Discord, msg){
        let currentDate = new Date(Date.now())
        const embed = new Discord.MessageEmbed()
        .setTitle('Singularity Credits')
        .setColor(0x000000)
        .setDescription(`
            This bot was made by **poly#3622** and **Redstone#1165** using the **Discord.js** module and a **MongoDB** database

            Profile picture licensed under public domain at https://www.flickr.com/photos/51686021@N07/41138945550 - the creator of this image is in no way affiliated or endorses Singularity

            **Improve Singularity!** Singularity is open-source! Check out the repository on GitHub at https://github.com/Poly-Pixel/Singularity and join the support server at https://discord.gg/Q5GbzpXgSz
        `)
        .setFooter(`Credits requested by ${msg.author.tag} • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`, msg.author.displayAvatarURL());
        
        msg.channel.send({embeds: [embed]});
    },
    async slashExecute(client, Discord, interaction){
        await interaction.deferReply({ephemeral: true})
        let currentDate = new Date(Date.now())
        const embed = new Discord.MessageEmbed()
        .setTitle('Singularity Credits')
        .setColor(0x000000)
        .setDescription(`
            This bot was made by **poly#3622** and **Redstone#1165** using the **Discord.js** module and a **MongoDB** database

            Profile picture licensed under public domain at https://www.flickr.com/photos/51686021@N07/41138945550 - the creator of this image is in no way affiliated or endorses Singularity

            **Improve Singularity!** Singularity is open-source! Check out the repository on GitHub at https://github.com/Poly-Pixel/Singularity and join the support server at https://discord.gg/Q5GbzpXgSz
        `)
        .setFooter(`Credits requested by ${interaction.user.tag} • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`, interaction.user.displayAvatarURL());
        
        interaction.editReply({embeds: [embed]});
    }
}