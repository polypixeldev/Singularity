module.exports = {
    name: 'mysingularity',
    description: 'Provides information about My Singularity',
    type: 'ms',
    args: [],
    aliases: ['ms'],
    example: 'mysingularity',
    execute(msg, args, Discord, guildPrefix){
        const embed = new Discord.MessageEmbed()
        .setTitle('My Singularity')
        .setColor(0x000000)
        .setFooter(`My Singularity info requested by ${msg.author.tag}`, msg.author.displayAvatarURL())
        .setDescription(`
            ***My Singularity is the new best way to show off what you've done for a server!***

            **What is "My Singularity"?**
            My Singularity is the feature of this bot that allows you to show off in a whole new way. \
            Instead of just plain leveling, rank cards, and leaderboards, My Singularity allows you to, hence the name, build *YOUR OWN* black hole!

            **How does it work?**
            By being active in a server, you can gain *atoms*. These atoms are a sort of currency in the My Singularity system. \
            You can use them to make your black hole bigger, or to trade them in for better items. The Developers (poly#3622 and Redstone#1165) will always be adding new features to My Singularity to keep your black hole growing!

            *Use \`${guildPrefix}help ms\` to get a full list of My Singularity commands*
        `);
        msg.channel.send(embed);
    }
}