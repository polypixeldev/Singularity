import Express from "express";
import CORS from "cors";
import axios from "axios";
import fs from "fs";

import APIClient from "../server";

export default async (client: APIClient) => {
	const router = Express.Router();

	router.use(CORS());

	const routeArr: string[] = [];

	let routes = fs
		.readdirSync("./prod/website/backend/routes", {
			withFileTypes: true,
		})
		.filter((file) => file.name.endsWith(".js"));

	const search = async () => {
		routes = fs
			.readdirSync(`./prod/website/backend/routes/${routeArr.join("/")}`, {
				withFileTypes: true,
			})
			.filter((file) => file.name.endsWith(".js"));

		for (const ent of routes) {
			if (ent.isDirectory()) {
				routeArr.push(ent.name);
				search();
			} else {
				const exec = (
					await import(`./routes/${routeArr.join("/")}/${ent.name}`)
				).default;

				router.all(
					`${routeArr.join("/")}/${ent.name.slice(0, ent.name.length - 3)}`,
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
