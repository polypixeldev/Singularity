const Express = require('express');
module.exports = {
	start(){
		const app = Express();
		app.get('/', (req, res) => {
			res.send('test');
		})
		app.listen(8000, 'localhost', () => {
			console.log('API Server running at http://localhost:8000');
		})
	},
	stop(){

	}
}