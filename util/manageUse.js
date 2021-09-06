module.exports = {
  activate(client, Discord, userDoc, item) {
    for (let i = 0; i < userDoc.items.length; i++) {
      if (userDoc.items[i] === item.name) {
        userDoc.items.splice(i, 1);
        break;
      }
    }

    if (item.time > 0) {
      setTimeout(async () => {
        let newServerDoc = await client.utils.loadGuildInfo(
          client,
          userDoc.guildID
        );
        let newUserDoc = await client.utils.loadUserInfo(
          client,
          newServerDoc,
          userDoc.userID
        );

        for (let i = 0; i < newUserDoc.active.length; i++) {
          if (newUserDoc.active[i].name === item.name) {
            newUserDoc.active.splice(i, 1);
            break;
          }
        }

        client.utils.updateUser(
          client,
          newServerDoc.guildID,
          newUserDoc.userID,
          newUserDoc
        );
      }, item.time * 1000);
    }

    let embed;

    switch (item.name) {
      case "instant": {
        let random = Math.round(Math.random() * 100);
        userDoc.protons += random;
        userDoc.electrons += Math.round(random / 2.5);

        embed = new Discord.MessageEmbed().setColor(0x000000).setDescription(`
					Instant Boost used!

					+**${random}** Protons
					+**${Math.round(random / 2.5)}** Electrons
				`);
        break;
      }
      case "lasting":
        break;
      default:
        console.log("hmmm");
    }

    client.utils.updateUser(client, userDoc.guildID, userDoc.userID, userDoc);

    return embed;
  },
  message() {},
};
