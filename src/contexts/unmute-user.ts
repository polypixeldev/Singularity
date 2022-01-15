export default {
	name: "Unmute User",
	type: "USER",
	async execute(client, Discord, interaction, serverDoc) {
		(await import("../commands/unmute.js")).default.slashExecute(
			client,
			Discord,
			interaction,
			serverDoc
		);
	},
};
