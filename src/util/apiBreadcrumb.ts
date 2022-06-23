import { addBreadcrumb } from "@sentry/node";

import type GuildAvailableEvent from "../interfaces/api/GuildAvailableEvent.js";

export default (endpoint: string, _: GuildAvailableEvent, guildId: string) => {
	addBreadcrumb({
		type: "debug",
		category: "api",
		message: `Client API interface \`${endpoint}\` hit`,
		level: "info",
		data: {
			guildId,
		},
	});
};
