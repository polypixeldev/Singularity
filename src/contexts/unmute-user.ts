export default {
	name: "Unmute User",
	type: "USER",
	async execute(client, Discord, interaction) {
		(await import("../commands/unmute.js")).default.slashExecute(
			client,
			Discord,
			interaction
		);
	},
};
