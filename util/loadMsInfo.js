module.exports = (serverDoc, id) => {
	return new Promise((resolve, reject) => {
		let filteredArr = serverDoc.ms.filter(user => user.userID === id);
		if(filteredArr.length > 1){
			reject('err');
		} else if(filteredArr.length === 0){
			const newMS = {
				userID: id,
				protons: 0,
				electrons: 0,
				items: [],
				powerUps: [],
				lifeExp: 0,
				darkMatter: 0,
				active: [],
				singularity: {
					type: 'black',
					size: 10,
					ferocity: 0
				}
			};

			serverDoc.ms.push(newMS);
  
			serverDoc.save().then(() => {
				resolve(newMS);
			});
			
		} else {
			resolve(filteredArr[0]);
		}
	});
}
