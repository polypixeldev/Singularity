import updateServer from "../../util/updateServer.js";

import Singularity from "../../interfaces/singularity.js";
import AsyncApiEvent from "../../interfaces/api/AsyncApiEvent.js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (
	client: Singularity,
	ev: AsyncApiEvent,
	userID: string,
	guildID: string,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data: any
) => {
	ev.code = new Promise((resolve) => {
		client.guilds.cache
			.get(guildID)
			?.members.fetch(userID)
			.then((member) => {
				if (!member) return resolve(2);
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const cleanData: any = {};
				for (const prop in data) {
					if (data[prop]) cleanData[prop] = data[prop];
				}
				updateServer(client, guildID, cleanData);
				return resolve(0);
			});
	});
};
