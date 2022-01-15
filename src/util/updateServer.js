export default async (client, id, data) => {
	await client.serverModel.updateOne({ guildID: id }, data).exec();
};
