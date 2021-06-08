module.exports = async (serverModel, client, member) => {
    const serverDoc = await serverModel.findOne({guildID: member.guild.id});
    const channel = member.guild.channels.cache.find(ch => ch.name === serverDoc.leaveChannelName);
    if (!channel) return;
    const tagRegex = /{member-tag}/g;
    const nameRegex = /{member-name}/g;
    let leaveMsg1 = serverDoc.leaveMessage.replace(tagRegex, `${member.user.tag}`);
    let leaveMsg2 = leaveMsg1.replace(nameRegex, `${member.user.username}`);

    channel.send(leaveMsg2);
}