import type { GuildResolvable } from "discord.js";
import type { HydratedDocument } from "mongoose";

import type Singularity from "../interfaces/singularity.js";
import type { Server } from "../database/schema/server.js";

export default (
	client: Singularity,
	guildResolvable: GuildResolvable
): Promise<HydratedDocument<Server>> => {
	return new Promise((resolve, reject) => {
		const guild = client.guilds.resolve(guildResolvable);
		if (!guild) {
			return reject("Unable to resolve guild");
		}

		client.serverModel
			.findOne({ guildID: guild.id })
			.exec()
			.then((serverDoc) => {
				if (serverDoc === null) {
					client.serverModel
						.create<Server>({
							guildID: guild.id,
							welcomeMessage: "{member-mention} has joined the server!",
							welcomeChannelID: "none",
							leaveChannelID: "none",
							leaveMessage: "{member-tag} has left the server :(",
							reactionRoles: [],
							ms: [],
							items: [
								{
									name: "instant",
									description: "Instant chance of something!",
									effects: "Random!",
									time: 0,
									useable: true,
									protons: 1,
									electrons: 1,
									darkMatter: 0,
									rare: false,
								},
								{
									name: "lasting",
									description: "Lasting change of something!",
									effects: "Random!",
									time: 60,
									useable: true,
									protons: 2,
									electrons: 2,
									darkMatter: 0,
									rare: false,
								},
								{
									name: "Wormhole Relic",
									description:
										"An ancient relic from the early days of the universe when wormholes were common",
									effects: "None",
									time: 0,
									useable: false,
									protons: 0,
									electrons: 0,
									darkMatter: 0,
									rare: true,
								},
								{
									name: "Space String",
									description:
										"A piece of the string that holds spacetime together",
									effects: "None",
									time: 0,
									useable: false,
									protons: 0,
									electrons: 0,
									darkMatter: 0,
									rare: true,
								},
								{
									name: "???",
									description: "Nobody knows exactly what this is...",
									effects: "None",
									time: 0,
									useable: false,
									protons: 0,
									electrons: 0,
									darkMatter: 0,
									rare: true,
								},
							],
							types: ["Black", "White", "Ethereal"],
						})
						.then((newServer) => {
							resolve(newServer);
						})
						.catch((err) => reject(err));
				} else {
					resolve(serverDoc);
				}
			});
	});
};
