const fs = require('fs');
module.exports = (serverModel, client, member) => {
  let configRaw = fs.readFileSync('config.json');
  let configArr = JSON.parse(configRaw);
    const channel = member.guild.channels.cache.find(ch => ch.name === configArr[0][member.guild.id].welcomeChannelName);
    if (!channel) return;
    const tagRegex = /{member-tag}/g;
    const nameRegex = /{member-name}/g;
    const mentionRegex = /{member-mention}/g;
    let welcomeMsg = configArr[0][member.guild.id].welcomeMessage.replace(tagRegex, `${member.tag}`);
    welcomeMsg = welcomeMsg.replace(nameRegex, `${member.user.username}`);
    welcomeMsg = welcomeMsg.replace(mentionRegex, `<@${member.user.id}>`);

    channel.send(welcomeMsg);
    if(member.guild.id === '822162764964560937'){
    member.guild.roles.fetch('824074694101041182').then(role => {
      member.roles.add(role)});
      if(member.user.id === '755451090375278613'){
        member.guild.roles.fetch('836715599819571220').then(role => {
          member.roles.add(role)
        });
      }
    }
      
}