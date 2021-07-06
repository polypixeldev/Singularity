module.exports = async (client, serverDoc, data) => {
	client.serverModel.updateOne({guildID: serverDoc.guildID}, data);
	await serverDoc.save(client.utils.saveCallback);
}
