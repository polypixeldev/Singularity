export default {
	name: "Mute User",
	type: "USER",
	async execute(client, Discord, interaction, serverDoc) {
		(await import("../commands/mute.js")).default.slashExecute(
			client,
			Discord,
			interaction,
			serverDoc
		);
	},
};
