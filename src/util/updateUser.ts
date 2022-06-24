import type { Snowflake } from "discord.js";

import type Singularity from "../interfaces/singularity.js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async (
	client: Singularity,
	guildID: Snowflake,
	userID: Snowflake,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data: any
) => {
	const filteredData = { ...data };
	delete filteredData._id;

	await client.userModel
		.replaceOne({ guildID: guildID, userID: userID }, filteredData)
		.exec();
};
