export default {
	name: "Kick User",
	type: "USER",
	async execute(client, Discord, interaction, serverDoc) {
		(await import("../commands/kick.js")).default.slashExecute(
			client,
			Discord,
			interaction,
			serverDoc
		);
	},
};
