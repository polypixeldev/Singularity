const axios = require('axios');

module.exports = (api, req, res) => {
	api.get('https://discord.com/api/users/@me')
	.then(apiRes => {
		api.get(`https://cdn.discordapp.com/avatars/${apiRes.data.id}/${apiRes.data.avatar}`, {
			responseType: 'arraybuffer'
		})
		.then(avatarRes => {
			apiRes.data.avatar = Buffer.from(avatarRes.data, 'binary').toString('base64')

			api.get(`https://discord.com/api/users/@me/guilds`)
			.then(async guildsRes => {
				for(let i=0; i < guildsRes.data.length; i++){
					if(guildsRes.data[i].icon !== null){
						let avatar = await api.get(`https://cdn.discordapp.com/icons/${guildsRes.data[i].id}/${guildsRes.data[i].icon}.png`, {
							responseType: 'arraybuffer'
						})
						guildsRes.data[i].icon = Buffer.from(avatar.data, 'binary').toString('base64')
					}
				}
				apiRes.data.guilds = guildsRes.data
				res.json({
					code: 0,
					data: apiRes.data
				})
			})
			.catch(err => {
				console.log(err.stack)
				console.log(err.response)
				res.json({
					code: 1
				})
			})
		})
		.catch(err => {
			console.log(err.message)
			res.json({
				code: 1
			})
		})
	})
	.catch(err => {
		console.log(err.message)
		res.json({
			code: 1
		})
	})
}