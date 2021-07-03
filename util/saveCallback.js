module.exports = {
	name: "saveCallback",
	execute(err){
		if(err !== null && err){
			throw new Error(`There was an error saving the document: ${err}`);
		}
	}
}