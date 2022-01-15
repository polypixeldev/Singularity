module.exports = {
	name: "Mute User",
	type: "USER",
	execute(client, Discord, interaction, serverDoc) {
		require("../commands/mute.js").slashExecute(
			client,
			Discord,
			interaction,
			serverDoc
		);
	},
};
