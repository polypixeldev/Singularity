module.exports = async (Discord, client, member) => {
    const serverDoc = await client.utils.loadGuildInfo(client, member.guild);
    const channel = member.guild.channels.resolve(serverDoc.welcomeChannelID);
    if (!channel) return;
    const tagRegex = /{member-tag}/g;
    const nameRegex = /{member-name}/g;
    const mentionRegex = /{member-mention}/g;
    let welcomeMsg = serverDoc.welcomeMessage.replace(tagRegex, `${member.user.tag}`);
    welcomeMsg = welcomeMsg.replace(nameRegex, `${member.user.username}`);
    welcomeMsg = welcomeMsg.replace(mentionRegex, `<@${member.user.id}>`);

    channel.send(welcomeMsg);
    // if(member.guild.id === '822162764964560937'){
    // member.guild.roles.fetch('824074694101041182').then(role => {
    //   member.roles.add(role)});
    //   if(member.user.id === '755451090375278613'){
    //     member.guild.roles.fetch('836715599819571220').then(role => {
    //       member.roles.add(role)
    //     });
    //   }
    // }
      
}