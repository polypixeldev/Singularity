import Express from "express";
import { EventEmitter } from "events";
import fs from "fs";
import { addBreadcrumb, Severity } from "@sentry/node";

import apiRouter from "./backend/router";

import ApiClientOptions from "../interfaces/api/ApiClientOptions";

export default class APIClient extends EventEmitter {
	type: string;
	port: number;
	host: string;
	app: Express.Application;
	constructor(props: ApiClientOptions) {
		super();

		props = props ?? {};

		this.type = props.type ?? "full";

		this.port = props.port ?? 5000;
		this.host = props.host ?? "localhost";

		this.app = Express();

		this.startBackend = this.startBackend.bind(this);
		this.startFrontend = this.startFrontend.bind(this);
		this.startFull = this.startFull.bind(this);

		switch (this.type) {
			case "frontend":
				this.startFrontend();
				break;
			case "backend":
				this.startBackend();
				break;
			default:
				this.startFull();
		}

		this.app.use("/", (req, res, next) => {
			addBreadcrumb({
				type: "debug",
				category: "website",
				message: `Endpoint \`${req.url}\` requested`,
				level: "info",
			});
			next();
		});

		this.app.listen(this.port, this.host, () => {
			console.log(
				`${
					this.type === "frontend"
						? "Frontend"
						: this.type === "backend"
						? "Backend"
						: "Full"
				} Server running at http://${this.host}:${this.port}`
			);
		});
	}

	async startBackend() {
		this.app.use(Express.json());
		this.app.use("/api", await apiRouter(this));
	}

	startFrontend() {
		const html = fs.readFileSync(__dirname + "/frontend/build/index.html");
		this.app.use(Express.static("./frontend/build/"));
		this.app.use((req, res) => {
			res.send(html);
		});
	}

	async startFull() {
		const html = fs.readFileSync(__dirname + "/frontend/build/index.html");
		this.app.use(Express.static(__dirname + "/frontend/build/"));

		this.app.use("/api", await apiRouter(this));

		this.app.use((req, res) => {
			res.type("html");
			res.send(html);
		});
	}
}
