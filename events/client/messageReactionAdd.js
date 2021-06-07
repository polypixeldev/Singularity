const fs = require('fs');
module.exports = async (Discord, client, reaction, user) => {
  let configRaw = fs.readFileSync('config.json');
let configArr = JSON.parse(configRaw);
    if(reaction.partial){
        console.log('partial detected');
        await reaction.fetch(true)
            .then(() => {
            })
            .catch(error => {
                console.log('Something went wrong when fetching the message: ', error);
            });
      }
      if(user.partial){
        await user.fetch()
            .then(() => {
    
            })
            .catch(error => {
                console.log('Something went wrong when fetching the message: ', error);
            });
      } else {
        //empty
      }
      let realReaction = reaction;
      let realUser = user;
      const roleListener = configArr[0][realReaction.message.guild.id].reactionroles;
      console.log(`Reaction added: ${realReaction.emoji.name} on ${realReaction.message.content} by ${realReaction.message.author.tag} in ${realReaction.message.channel} in ${realReaction.message.channel.guild}`);
      if(realReaction.message.channel.name === 'reaction-roles' && realUser.tag !== 'Singularity#9601'){
      for(let i=0; i < roleListener.length; i++){
        if(realReaction.emoji.name === roleListener[i][1]){
          const member = realReaction.message.guild.members.resolve(realUser);
       let roleToAddToMember = realReaction.message.guild.roles.cache.find((role) => role.name === roleListener[i][0].name);
        member.roles.add(roleToAddToMember.id);
      }
        }
    }
}