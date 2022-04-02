import { Snowflake } from "discord.js";

import Singularity from "../interfaces/singularity";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async (
	client: Singularity,
	guildID: Snowflake,
	userID: Snowflake,
	data: any
) => {
	await client.userModel
		.replaceOne(
			{ guildID: guildID, userID: userID },
			{ ...data, _id: undefined }
		)
		.exec();
};
