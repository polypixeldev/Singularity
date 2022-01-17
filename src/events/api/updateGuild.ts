import updateServer from "../../util/updateServer";

import Singularity from "../../interfaces/singularity";
import AsyncApiEvent from "../../interfaces/api/AsyncApiEvent";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (
	client: Singularity,
	ev: AsyncApiEvent,
	userID: string,
	guildID: string,
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
