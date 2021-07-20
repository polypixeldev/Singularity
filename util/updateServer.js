module.exports = async (client, serverDoc, data) => {
	await client.serverModel.updateOne({guildID: serverDoc.guildID}, data).exec();
	await serverDoc.save(client.utils.saveCallback);
}
