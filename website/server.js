const Express = require('express');

const apiRouter = require('./backend/router.js')

const corsOptions = {
	origin: 'http://localhost:3000'
}

module.exports = {
	start(type){
		const app = Express();

		if(type === 'frontend'){
			app.use(Express.static('C:/Users/samme/Documents/Programs/Singularity/website/frontend/build'));
			app.use((req, res) => {
				res.sendFile('../frontend/build/index.html');
			})
		} else if(type === 'backend'){
			app.use('/api', apiRouter)
		} else {
			app.use(Express.static('C:/Users/samme/Documents/Programs/Singularity/website/frontend/build'));
			app.get('/api/', (req, res) => {
				res.send('api');
			})
			app.use((req, res) => {
				res.sendFile('C:/Users/samme/Documents/Programs/Singularity/website/frontend/build/index.html');
			})
		}
		app.listen(5000, 'localhost', () => {
			console.log(`${type === 'frontend' ? 'Frontend': type ===  'backend' ? 'Backend' : 'Full'} Server running at http://localhost:5000`);
		})
	}
}