import Express from "express";
import CORS from "cors";
import axios from "axios";
import fs from "fs";

export default async (client) => {
	const router = Express.Router();

	let corsOptions = {};

	let routeArr = [];

	let routes = fs
		.readdirSync("./prod/website/backend/routes", {
			withFileTypes: true,
		})
		.filter((file) => file.name.endsWith(".js"));

	let search = async () => {
		routes = fs
			.readdirSync(`./prod/website/backend/routes/${routeArr.join("/")}`, {
				withFileTypes: true,
			})
			.filter((file) => file.name.endsWith(".js"));

		for (let ent of routes) {
			if (ent.isDirectory()) {
				routeArr.push(ent.name);
				search();
			} else {
				let exec = await import(`./routes/${routeArr.join("/")}/${ent.name}`);

				router.all(
					`${routeArr.join("/")}/${ent.name.slice(0, ent.name.length - 3)}`,
					CORS(corsOptions),
					(req, res) => {
						const apiInstance = axios.create({
							headers: {
								Authorization: `Bearer ${req.query?.token ?? req.body?.token}`,
							},
						});

						return exec(apiInstance, client, req, res);
					}
				);
			}
		}
	};

	await search();

	return router;
};
