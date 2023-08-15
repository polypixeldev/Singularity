import React from "react";
import ReactDOM from "react-dom";
import App from "./app.jsx";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

Sentry.init({
	dsn: "https://ab3c555304e747c382f833cbe7c52b50@o920118.ingest.sentry.io/5935338",
	integrations: [new Integrations.BrowserTracing()],
	tracesSampleRate: 1.0,
});

ReactDOM.render(
	<HelmetProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</HelmetProvider>,
	document.getElementById("root"),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://vitejs.dev/guide/api-hmr.html
if (import.meta.hot) {
	import.meta.hot.accept();
}
