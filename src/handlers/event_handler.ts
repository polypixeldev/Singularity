import fs from "fs";

export default (Discord, client, api) => {
	const load_dir = async (dirs) => {
		const event_files = fs
			.readdirSync(`./prod/events/${dirs}`)
			.filter((file) => file.endsWith("js"));

		for (const file of event_files) {
			const event = (await import(`../events/${dirs}/${file}`)).default;
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
