import Express from "express";
import { EventEmitter } from "events";
import bodyParser from "body-parser";
import fs from "fs";
import apiRouter from "./backend/router";

export default class APIClient extends EventEmitter {
	type: string;
	port: number;
	host: string;
	app: Express.app;
	constructor(props) {
		super(props);

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
		this.app.use(bodyParser.json());
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
			res.send(html);
		});
	}
}
