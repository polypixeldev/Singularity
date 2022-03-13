import fs from "fs";

import apiBreadcrumb from "../util/apiBreadcrumb";

import Singularity from "../interfaces/singularity";
import APIClient from "../website/server";

export default (client: Singularity, api: APIClient) => {
	const load_dir = async (dir: string) => {
		const event_files = fs
			.readdirSync(`./prod/events/${dir}`)
			.filter((file) => file.endsWith("js"));

		for (const file of event_files) {
			const event = (await import(`../events/${dir}/${file}`)).default;
			const event_name = file.split(".")[0];
			if (dir === "api") {
				api.on(event_name, event.bind(null, client));
				api.on(event_name, apiBreadcrumb.bind(null, event_name));
			} else if (dir === "client") {
				client.on(event_name, event.bind(null, client));
			}
		}
	};

	["client", "api"].forEach((e) => load_dir(e));

	console.log("Event Handlers Ready");
};
