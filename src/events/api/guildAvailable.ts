import loadGuildInfo from "../../util/loadGuildInfo.js";

import type Singularity from "../../interfaces/singularity.js";
import type GuildAvailableEvent from "../../interfaces/api/GuildAvailableEvent.js";

export default (
	client: Singularity,
	ev: GuildAvailableEvent,
	guildID: string
) => {
	ev.available = !client.guilds.cache.get(guildID) ? false : true;
	if (ev.available) {
		ev.data = loadGuildInfo(client, guildID);
		ev.guild = client.guilds.fetch(guildID);
	}
};
