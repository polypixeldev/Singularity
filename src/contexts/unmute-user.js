module.exports = {
	name: "Unmute User",
	type: "USER",
	execute(client, Discord, interaction, serverDoc) {
		require("../commands/unmute.js").slashExecute(
			client,
			Discord,
			interaction,
			serverDoc
		);
	},
};
