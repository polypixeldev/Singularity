module.exports = (Discord, client) =>{
    console.log('Singularity is now online');
    client.user.setPresence({ activity: { name: 'singularitybot.glitch.me', type: "WATCHING" }, status: 'online' });
}