module.exports = async (serverModel, client, reaction, user) => {
    if(reaction.partial){
        await reaction.fetch(true)
            .catch(error => {
                console.log('Something went wrong when fetching the message: ', error);
            });
      }
      if(user.partial){
        await user.fetch()
            .catch(error => {
                console.log('Something went wrong when fetching the message: ', error);
            });
      }
      let realReaction = reaction;
      let realUser = user;
      const serverDoc = await serverModel.find({guildID: reaction.message.guild.id});
      const roleListener = serverDoc.reactionroles;
      console.log(`Reaction added: ${realReaction.emoji.name} on ${realReaction.message.content} by ${realReaction.message.author.tag} in ${realReaction.message.channel} in ${realReaction.message.channel.guild}`);
      if(realReaction.message.id === roleListener[2] && realUser.tag !== 'Singularity#9601'){
      for(let i=0; i < roleListener.length; i++){
        if(realReaction.emoji.name === roleListener[i][1]){
          const member = realReaction.message.guild.members.resolve(realUser);
       let roleToAddToMember = realReaction.message.guild.roles.cache.find((role) => role.name === roleListener[i][0].name);
        member.roles.add(roleToAddToMember.id);
      }
        }
    }
}