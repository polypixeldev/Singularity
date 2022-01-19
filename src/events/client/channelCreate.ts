import Discord from "discord.js";

import Singularity from "../../interfaces/singularity";

export default async (client: Singularity, channel: Discord.GuildChannel) => {
	await channel.guild.roles.fetch();

	const muteRole = channel.guild.roles.cache.find((rl) => rl.name === "Muted");

	if (!muteRole) return;

	if (!(channel instanceof Discord.ThreadChannel)) {
		if (channel.manageable) {
			if (channel.isText()) {
				channel.permissionOverwrites.create(
					muteRole,
					{
						SEND_MESSAGES: false,
					},
					{
						reason: "Setting up Muted role",
					}
				);
			} else {
				channel.permissionOverwrites.create(
					muteRole,
					{
						SPEAK: false,
					},
					{
						reason: "Setting up Muted role",
					}
				);
			}
		}
	}
};
