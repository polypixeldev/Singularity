module.exports = async (Discord, client, channel) => {
	await channel.guild.roles.fetch();

	let muteRole = channel.guild.roles.cache.find((rl) => rl.name === "Muted");

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
