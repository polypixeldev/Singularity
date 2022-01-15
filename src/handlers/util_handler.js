import fs from "fs";

export default async (Discord, client) => {
	const util_files = fs
		.readdirSync("./util/")
		.filter((file) => file.endsWith("js"));

	for (const file of util_files) {
		const util = await import(`../util/${file}`);
		client.utils[file.split(".")[0]] = util;
	}
};
