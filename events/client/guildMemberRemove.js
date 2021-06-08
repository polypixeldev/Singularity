const fs = require('fs');
module.exports = (serverModel, client, member) => {
    let configRaw = fs.readFileSync('config.json');
    let configArr = JSON.parse(configRaw);
    const channel = member.guild.channels.cache.find(ch => ch.name === configArr[0][member.guild.id].leaveChannelName);
    if (!channel) return;
    const tagRegex = /{member-tag}/g;
    const nameRegex = /{member-name}/g;
    let leaveMsg1 = configArr[0][member.guild.id].leaveMessage.replace(tagRegex, `${member.user.tag}`);
    let leaveMsg2 = leaveMsg1.replace(nameRegex, `${member.user.username}`);

    channel.send(leaveMsg2);
}