export default {
	activate(client, Discord, userDoc, item) {
		for (let i = 0; i < userDoc.items.length; i++) {
			if (userDoc.items[i] === item.name) {
				userDoc.items.splice(i, 1);
				break;
			}
		}

		if (item.time > 0) {
			userDoc.active.push({
				...item,
				start: Date.now(),
			});
			setTimeout(async () => {
				const newServerDoc = await client.utils.loadGuildInfo(
					client,
					userDoc.guildID
				);
				const newUserDoc = await client.utils.loadUserInfo(
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
					{
						...newUserDoc.toObject(),
						active: newUserDoc.active,
					}
				);
			}, item.time * 1000);
		}

		let embed;

		switch (item.name) {
			case "instant": {
				const random = Math.round(Math.random() * 100);
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
				embed = new Discord.MessageEmbed().setColor(0x000000).setDescription(`
          Lasting Boost used!

          You will now gain extra protons and electrons for 60 seconds
        `);
				break;
			default:
				console.log(`Unknown item name: ${item.name}`);
		}

		client.utils.updateUser(client, userDoc.guildID, userDoc.userID, userDoc);

		return embed;
	},
	message(msg, userDoc, addProton, addElectron, addDarkMatter) {
		if (userDoc.active.find((item) => item.name === "lasting")) {
			addProton *= 2;
			addElectron *= 2;
			addDarkMatter *= 2;
		}
		return [addProton, addElectron, addDarkMatter];
	},
};
