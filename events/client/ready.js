module.exports = (Discord, client) =>{
    console.log('Singularity is now online');
    client.user.setPresence({ activity: { name: 'singularity-bot-site.glitch.me', type: "WATCHING" }, status: 'online' });
}