module.exports = (serverDoc, id) => {
	return new Promise((resolve, reject) => {
	console.log(serverDoc);
		let userMS;
		let filteredArr = serverDoc.ms.filter(user => user.userID === id);
		if(filteredArr.length > 1){
			//return 'err';
			reject('err');
		} else if(filteredArr.length === 0){
			console.log('mSetting...');
			const newMS = {
				userID: id,
				atoms: 0,
				items: [],
				powerUps: [],
				singularity: {
					type: 'black',
					size: 10,
					ferocity: 0
				}
			};

			serverDoc.ms.push(newMS);
  
			userMS = serverDoc.save();
			console.log('msSet');
			
		} else {
			userMS = filteredArr[0];
		}

		//return userMS;
		resolve(userMS);
	});
}
