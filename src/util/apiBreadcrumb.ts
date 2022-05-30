import { addBreadcrumb } from "@sentry/node";

import GuildAvailableEvent from "../interfaces/api/GuildAvailableEvent";

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
