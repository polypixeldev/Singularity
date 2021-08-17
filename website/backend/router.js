const Express = require('express')
const CORS = require('cors')
const axios = require('axios').default

const router = Express.Router()
router.get('/userinfo', CORS(), (req, res) => {
	const apiInstance = axios.create({
		headers: {"Authorization": `Bearer ${req.query.token}`}
	})
	router.use(Express.json)
	apiInstance.get('https://discord.com/api/users/@me')
	.then(apiRes => {
		console.log(apiRes.data)
		res.json(apiRes.data)
	})
	.catch(err => {
		console.log(err)
		res.send(err)
	})
})

module.exports = router