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
					client.serverModel.create(
						{
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
								},
								{
									name: "Wormhole Relic",
									description:
										"An ancient relic from the early days of the universe when wormholes were common",
									effects: "None",
									useable: false,
									rare: true,
								},
								{
									name: "Space String",
									description:
										"A piece of the string that holds spacetime together",
									effects: "None",
									useable: false,
									rare: true,
								},
								{
									name: "???",
									description: "Nobody knows exactly what this is...",
									effects: "None",
									useable: false,
									rare: true,
								},
							],
							types: ["Black", "White", "Ethereal"],
						},
						(err, newServer) => {
							if (err) {
								reject(err);
							} else {
								resolve(newServer);
							}
						}
					);
				} else {
					resolve(serverDoc);
				}
			});
	});
};
