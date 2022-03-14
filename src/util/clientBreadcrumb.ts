import { addBreadcrumb, Severity } from "@sentry/node";

export default (event_name: string) => {
	addBreadcrumb({
		type: "debug",
		category: "bot",
		message: `Client event ${event_name} recieved`,
		level: Severity.Info,
	});
};
