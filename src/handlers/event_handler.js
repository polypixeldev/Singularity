const fs = require("fs");

module.exports = (Discord, client, api) => {
	const load_dir = (dirs) => {
		const event_files = fs
			.readdirSync(`./events/${dirs}`)
			.filter((file) => file.endsWith("js"));

		for (const file of event_files) {
			const event = require(`../events/${dirs}/${file}`);
			const event_name = file.split(".")[0];
			if (dirs === "api") {
				api.on(event_name, event.bind(null, client));
			} else if (dirs === "client") {
				client.on(event_name, event.bind(null, Discord, client));
			}
		}
	};

	["client", "api"].forEach((e) => load_dir(e));

	console.log("Event Handlers Ready");
};
