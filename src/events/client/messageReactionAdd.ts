import Discord from "discord.js";

import loadGuildInfo from "../../util/loadGuildInfo.js";

import type Singularity from "../../interfaces/singularity.js";

export default async (
	client: Singularity,
	reaction: Discord.MessageReaction,
	user: Discord.User,
) => {
	if (reaction.partial) {
		await reaction.fetch().catch((error) => {
			console.log("Something went wrong when fetching the message: ", error);
		});
	}

	if (user.partial) {
		await user.fetch().catch((error) => {
			console.log("Something went wrong when fetching the message: ", error);
		});
	}

	if (!reaction.message.guild) {
		return;
	}

	const serverDoc = await loadGuildInfo(client, reaction.message.guild);
	const roleListeners = serverDoc.reactionRoles;

	for (const roleListener of roleListeners) {
		if (
			reaction.message.id === roleListener[2] &&
			user.id !== process.env.CLIENT_ID
		) {
			if (reaction.emoji.name === roleListener[1]) {
				const member = reaction.message.guild.members.resolve(user);

				await reaction.message.guild.roles.fetch();
				const roleToAddToMember = reaction.message.guild.roles.cache.find(
					(role) => role.name === roleListener[0],
				);

				if (!roleToAddToMember) {
					return;
				}

				member?.roles.add(roleToAddToMember.id);
			}
		}
	}
};
