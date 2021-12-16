module.exports = async (Discord, client, reaction, user) => {
	if (reaction.partial) {
		await reaction.fetch(true).catch((error) => {
			console.log("Something went wrong when fetching the message: ", error);
		});
	}
	if (user.partial) {
		await user.fetch().catch((error) => {
			console.log("Something went wrong when fetching the message: ", error);
		});
	}
	const serverDoc = await client.utils.loadGuildInfo(
		client,
		reaction.message.guild
	);
	const roleListener = serverDoc.reactionRoles;

	for (let i = 0; i < roleListener.length; i++) {
		if (
			reaction.message.id === roleListener[i][2] &&
			user.tag !== "Singularity#9601"
		) {
			if (reaction.emoji.name === roleListener[i][1]) {
				const member = reaction.message.guild.members.resolve(user);
				await reaction.message.guild.roles.fetch();
				let roleToAddToMember = reaction.message.guild.roles.cache.find(
					(role) => role.name === roleListener[i][0]
				);
				member.roles.add(roleToAddToMember.id);
			}
		}
	}
};
