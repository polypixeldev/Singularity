import updateUser from "./updateUser";

import Singularity from "../interfaces/singularity";

export default async (client: Singularity) => {
	const inactivityTimeout = 1000 * 60 * 60 * 24 * 14;
	const inactives = await client.userModel.find({
		activity: { $lte: new Date(new Date().getTime() - inactivityTimeout) },
	});

	const finals = inactives.filter(() => Math.random() < 0.6);

	const changed = finals.map((userDoc) => {
		userDoc.protons -= Math.random() * 100;
		userDoc.electrons -= Math.random() * 50;
		return userDoc;
	});

	changed.forEach((userDoc) => {
		updateUser(client, userDoc.guildID, userDoc.userID, {
			...userDoc.toObject(),
			protons: userDoc.protons,
			electrons: userDoc.electrons,
		});
	});
};
