const PQueue = require('p-queue').default;
const merge = require('lodash.merge');

let saveQueue = new PQueue({concurrency: 1});

module.exports = (client, serverDoc, userDoc) => {
	return saveQueue.add(() => {
		return new Promise((resolve, reject) => {
			client.utils.loadUserInfo(client, serverDoc, userDoc.userID)
			.then(newDoc => {
				let v = newDoc.__v;
				let mergeDoc = merge(newDoc, userDoc);
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