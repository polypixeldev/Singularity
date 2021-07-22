const Express = require('express');
module.exports = {
	start(type){
		const app = Express();
		if(type === 'frontend'){
			app.use(Express.static('C:/Users/samme/Documents/Programs/Singularity/website/frontend/build'));
			app.use((req, res) => {
				res.sendFile('../frontend/build/index.html');
			})
		} else if(type === 'backend'){
			app.get('/api/', (req, res) => {
				res.send('api');
			})
		} else {
			app.use(Express.static('C:/Users/samme/Documents/Programs/Singularity/website/frontend/build'));
			app.get('/api/', (req, res) => {
				res.send('api');
			})
			app.use((req, res) => {
				res.sendFile('C:/Users/samme/Documents/Programs/Singularity/website/frontend/build/index.html');
			})
		}
		app.listen(8000, 'localhost', () => {
			console.log(`${type === 'frontend' ? 'Frontend': type ===  'backend' ? 'Backend' : 'Full'} Server running at http://localhost:8000`);
		})
	}
}