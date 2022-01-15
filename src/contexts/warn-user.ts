export default {
	name: "Warn User",
	type: "USER",
	execute(client, Discord, interaction, serverDoc) {
		require("../commands/warn.js").slashExecute(
			client,
			Discord,
			interaction,
			serverDoc
		);
	},
};
