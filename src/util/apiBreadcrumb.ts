import { addBreadcrumb, Severity } from "@sentry/node";

import GuildAvailableEvent from "../interfaces/api/GuildAvailableEvent";

export default (endpoint: string, _: GuildAvailableEvent, guildId: string) => {
	addBreadcrumb({
		type: "util",
		category: "api",
		message: `Client API interface \`${endpoint}\` hit`,
		level: Severity.Info,
		data: {
			guildId,
		},
	});
};
