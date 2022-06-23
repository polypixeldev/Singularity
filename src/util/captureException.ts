import { captureException } from "@sentry/node";
import type { CaptureContext } from "@sentry/types";

import logMessage from "./logMessage.js";

export default (err: unknown, context?: CaptureContext) => {
	captureException(err, context);
	logMessage(err);
};
