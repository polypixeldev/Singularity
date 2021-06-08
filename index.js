/*
REMINDERS:
 -Server perks system
 -Improve profile system (black hole upgrade system)
 -Make code cleaner (unnecessary arguments, pass config)
*/

const Discord = require('discord.js');
const client = new Discord.Client({partials: ["REACTION", "MESSAGE"]});
const express = require('express');
const mongoose = require('mongoose');

let app = express();
require('dotenv').config();

const url = 'mongodb://127.0.0.1:27017/Singularity';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.once('open', () => {
  console.log('Database connected:', url)
});

db.on('error', err => {
  console.error('connection error:', err)
});

const serverSchema = new mongoose.Schema({
  guildID: String,
  prefix: String,
  welcomeMessage: String,
  welcomeChannelName: String,
  leaveChannelName: String,
  leaveMessage: String,
  reactionRoles: Array
});

const profileSchema = new mongoose.Schema({
  profileID: String,
  data: Array
})

const serverModel = mongoose.model('serverModel', serverSchema);

const profileModel = mongoose.model('profileModel', profileSchema)

const testProfile = new profileModel({
  profileID: 'profileID',
  data: []
});


testProfile.save();

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(client, serverModel);
});

client.on('message', async msg => {
  if(msg.channel.type ==='dm' && !msg.author.bot){
    return msg.channel.send('Woops! Singularity doesn\'t respond to DM commands. Try sending `!help` in a server!');
  }

  let guildPrefix;

 await serverModel.findOne({guildID: msg.guild.id}).then(function(server, err){
    if(err !== null && err){
      const errEmbed = new Discord.MessageEmbed()
      .setColor(0x000000)
      .setDescription(`Uhoh, an error occured when recieving this message. If this issue persists, DM poly#3622 with a screenshot of this message. \n \n \`Error:\` \n \`\`\`${err}\`\`\``);

      return msg.channel.send(errEmbed);
    } else if(server === null){
      const newServer = new serverModel({
        guildID: msg.guild.id,
        prefix: '.',
        welcomeMessage: '{member-mention} has joined the server!',
        welcomeChannelName: 'welcome',
        leaveChannelName: 'welcome',
        leaveMessage: '{member-tag} has left the server :(',
        reactionroles: []
      });

      newServer.save(function(err){
        if(err !== null && err){
          const errEmbed = new Discord.MessageEmbed()
          .setColor(0x000000)
          .setDescription(`Uhoh, an error occured when recieving this message. If this issue persists, DM poly#3622 with a screenshot of this message. \n \n \`Error:\` \n \`\`\`${err}\`\`\``);
          return msg.channel.send(errEmbed);
        }
      });

      guildPrefix = '.';
    } else {
      guildPrefix = server.prefix;
    }

  });

  if(!msg.content.startsWith(guildPrefix) || msg.author.bot) return;

  const args = msg.content.slice(guildPrefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if(command === 'test'){
    client.commands.get('test').execute(msg, args, Discord);
  }

  if (command === `help`) {
    client.commands.get('help').execute(msg, args, Discord, guildPrefix, client);
  }

  if(command === `ping`) {
    client.commands.get('ping').execute(msg, client, Discord);
  }

  if (command === `exit` && msg.author.id === '722092754510807133') {
    client.commands.get('exit').execute(msg, Discord);
  }
  
  if (command === `invite`) {
    client.commands.get('invite').execute(msg, Discord);
  }

  if (command === `kick`) {
    client.commands.get('kick').execute(msg, args, Discord);
  }

  if (command === `tempban`) {
    client.commands.get('tempban').execute(msg, args, Discord);
  }

  if (command === `mute`) {
    client.commands.get('mute').execute(msg, client, Discord);
  }

  if(command === `h`){
    client.commands.get('h').execute(msg, args);
  }

  if(command === `bestmcseed`){
    client.commands.get('bestmcseed').execute(msg, args, Discord);
  }

  if(command === `unmute`){
    client.commands.get('unmute').execute(msg, args, Discord);
  }

  if(command === `prefix`){
    client.commands.get('prefix').execute(msg, args, Discord, serverModel);
  }

  if(command === 'nickname'){
    client.commands.get('nickname').execute(msg, args, Discord);
  }

  if(command === 'credits'){
    client.commands.get('credits').execute(msg, args, Discord);
  }

  if(command === 'reactionrole'){
    client.commands.get('reactionrole').execute(msg, args, serverModel, Discord);
  }
  /*
  The following 3 commands are down for maintenance! New features coming soon!

  if(command === 'register'){
    client.commands.get('register').execute(msg, args, fs, Discord, configArr);
  }

  if(command === 'profile'){
    client.commands.get('profile').execute(msg, configArr, Discord);
  }

  if(command === 'addprofilefield'){
    client.commands.get('profile').execute(msg, args, fs, Discord, configArr);
  }
  */

  if(command === 'say'){
    client.commands.get('say').execute(msg, args);
  }

  if(command === 'welcomemessage'){
    client.commands.get('welcomemessage').execute(msg, args, serverModel, Discord);
  }

  if(command === 'leavemessage'){
    client.commands.get('leavemessage').execute(msg, args, serverModel, Discord);
  }
  /*
  This command is also down for maintenance! New features coming soon!
  if(command === 'perks'){
    client.commands.get('perks').execute(msg, args, Discord, guildPrefix, configArr);
  }
  */

  if(command === 'clear'){
    client.commands.get('clear').execute(msg, args, Discord);
  }

  if(command === 'testping'){
    client.commands.get('testping').execute(msg);
  }

});

const port = 8000;

app.get('/',function(req,res){
  res.sendFile('C:/Users/samme/Documents/Bot/Singularity/index.html');

  //__dirname : It will resolve to your project folder.
});

app.get('/home',function(req,res){
  res.sendFile('C:/Users/samme/Documents/Bot/Singularity/index.html');

  //__dirname : It will resolve to your project folder.
});

app.get('/commands',function(req,res){
  res.sendFile('C:/Users/samme/Documents/Bot/Singularity/commands.html');

});

app.get('/dashboard',function(req,res){
  res.sendFile('C:/Users/samme/Documents/Bot/Singularity/dashboard.html');

});

app.get('/style.css',function(req,res){
  res.sendFile('C:/Users/samme/Documents/Bot/Singularity/style.css');
});

app.get('/script.js', function(req,res){
  res.sendFile('C:/Users/samme/Documents/Bot/Singularity/script.js');
});

app.get('/hole.ico', function(req,res){
  res.sendFile('C:/Users/samme/Documents/Bot/Singularity/hole.ico');
});

app.get('/hole.png', function(req,res){
  res.sendFile('C:/Users/samme/Documents/Bot/Singularity/hole.png');
});

app.get('/dropdown.png', function(req,res){
  res.sendFile('C:/Users/samme/Documents/Bot/Singularity/dropdown.png');
});



app.listen(port);
console.log('Server started at http://localhost:' + port);


client.login(process.env.TOKEN);