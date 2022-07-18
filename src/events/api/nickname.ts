import type Singularity from "../../interfaces/singularity.js";
import type AsyncApiEvent from "../../interfaces/api/AsyncApiEvent.js";

export default (
	client: Singularity,
	ev: AsyncApiEvent,
	userID: string,
	guildID: string,
	nickname: string
) => {
	ev.code = new Promise((resolve) => {
		client.guilds.cache
			.get(guildID)
			?.members.fetch(userID)
			.then((member) => {
				if (!member) return resolve(2);
				member.guild.members.me?.setNickname(
					nickname,
					`Web API - User ${userID}`
				);
				return resolve(0);
			});
	});
};
