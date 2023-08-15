import type { HydratedDocument } from "mongoose";
import type { Snowflake } from "discord.js";

import updateServer from "./updateServer.js";

import type Singularity from "../interfaces/singularity.js";
import type { Server } from "../database/schema/server.js";
import type { User } from "../database/schema/user.js";

export default (
	client: Singularity,
	serverDoc: HydratedDocument<Server>,
	id: Snowflake,
): Promise<HydratedDocument<User>> => {
	return new Promise((resolve, reject) => {
		client.userModel
			.findOne({ userID: id, guildID: serverDoc.guildID })
			.then((user) => {
				if (!user) {
					client.userModel
						.create({
							userID: id,
							guildID: serverDoc.guildID,
							protons: 0,
							electrons: 0,
							items: [],
							rareItems: [],
							powerUps: [],
							lifeExp: 0,
							darkMatter: 0,
							active: [],
							activity: new Date(Date.now()),
							singularity: {
								type: "Black",
								size: 10,
								ferocity: 0,
								prestige: 0,
							},
							infractions: [],
						})
						.then((userDoc) => {
							serverDoc.ms.push(userDoc._id);
							updateServer(client, serverDoc.guildID, {
								ms: serverDoc.ms,
							})
								.then(() => {
									resolve(userDoc);
								})
								.catch((err) => {
									reject(err);
								});
						});
				} else {
					resolve(user);
				}
			});
	});
};
