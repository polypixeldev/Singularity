const PQueue = require('p-queue').default;
const merge = require('lodash.merge');

let saveQueue = new PQueue({concurrency: 1});

module.exports = (client, doc) => {
	return saveQueue.add(() => {
		return new Promise((resolve, reject) => {
			client.utils.loadGuildInfo(client, doc.guildID)
			.then(newDoc => {
				let v = newDoc.__v;
				let mergeDoc = merge(newDoc, doc);
				mergeDoc.__v = v;
				mergeDoc.save()
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				})
			})
			.catch(err => {
				reject(err);
			})
		})
	})
}