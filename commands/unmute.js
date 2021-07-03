module.exports = {
    name: 'unmute',
    description: "Unmutes the mentioned user",
    type: 'mod',
    args: ['<user to unmute>'],
    aliases: [],
    example: 'unmute @poly',
    notes: 'user must be mentioned',
    async execute(client, Discord, msg){
        const user = msg.mentions.users.first();
      if (user) {
        const member = msg.guild.members.resolve(user);
        const unmuter = msg.guild.members.resolve(msg.author);
        if (member) {
          if(!unmuter.hasPermission('MUTE_MEMBERS')){
            const permsEmbed = new Discord.MessageEmbed()
            .setDescription('You do not have permission to unmute!')
            .setColor(0x000000);
            await msg.channel.send(permsEmbed);
            return;
          }
          const unmuteRole = msg.guild.roles.cache.find(role => role.name === "Muted");
          member
            .roles.remove(unmuteRole)
            .then(() => {
              msg.channel.send(`Successfully unmuted **${user.tag}**`);
            })
            .catch(err => {
              msg.channel.send('I was unable to unmute the member because: \n`' + err + "`");
              console.error(err);
            });
        } else {
          msg.channel.send("That user isn't in this guild!");
        }
      } else {
        msg.channel.send("You didn't mention the user to unmute!");
      }
    }
}