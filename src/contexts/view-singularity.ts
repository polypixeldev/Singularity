export default {
	name: "View Singularity",
	type: "USER",
	async execute(client, Discord, interaction, serverDoc) {
		(await import("../commands/ms/view.js")).default.slashExecute(
			client,
			Discord,
			interaction,
			serverDoc
		);
	},
};
