module.exports = {
    name: 'invite',
    description: "Invite link for Singularity",
    type: 'general',
    defaultPermission: true,
    options: [],
    args: [],
    aliases: ['i'],
    example: 'invite',
    execute(client, Discord, msg){
        let currentDate = new Date(Date.now())
        const embed = new Discord.MessageEmbed()
        .setTitle('Singularity Invite Link')
        .setColor(0x000000)
        .setDescription('https://discord.com/oauth2/authorize?client_id=835256019336036423&scope=bot&permissions=8')
        .setFooter(`Invite link requested by ${msg.author.tag} • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`, msg.author.displayAvatarURL());

        msg.reply({embeds: [embed]});
    },
    async slashExecute(client, Discord, interaction){
        await interaction.deferReply({ephemeral: true})
        let currentDate = new Date(Date.now())
        const embed = new Discord.MessageEmbed()
        .setTitle('Singularity Invite Link')
        .setColor(0x000000)
        .setDescription('https://discord.com/oauth2/authorize?client_id=835256019336036423&scope=bot&permissions=8')
        .setFooter(`Invite link requested by ${interaction.user.tag} • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`, interaction.user.displayAvatarURL());

        interaction.editReply({embeds: [embed]});
    }
}