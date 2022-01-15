export default async (client, guildID, userID, data) => {
	await client.userModel
		.replaceOne({ guildID: guildID, userID: userID }, data)
		.exec();
};
