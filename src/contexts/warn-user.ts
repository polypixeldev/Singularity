export default {
	name: "Warn User",
	type: "USER",
	async execute(client, Discord, interaction, serverDoc) {
		(await import("../commands/warn.js")).default.slashExecute(
			client,
			Discord,
			interaction,
			serverDoc
		);
	},
};
