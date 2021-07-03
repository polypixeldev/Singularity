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
//
const url = 'mongodb://127.0.0.1:27017/Singularity';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.once('open', () => {
  console.log('Database connected:', url)
});

db.on('error', err => {
  console.error('connection error:', err)
});

client.msSchema = new mongoose.Schema({
  userID: String,
  atoms: Number,
  items: Array,
  powerUps: Array,
  singularity: Object
});

const serverSchema = new mongoose.Schema({
  guildID: String,
  prefix: String,
  welcomeMessage: String,
  welcomeChannelName: String,
  leaveChannelName: String,
  leaveMessage: String,
  reactionRoles: Array,
  ms: [client.msSchema]
});

client.serverModel = mongoose.model('serverModel', serverSchema);

client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.utils = new Discord.Collection();

['command_handler', 'event_handler', 'util_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(Discord, client);
});
/*
client.on('message', async msg => {
  console.log('msg');
  let serverDoc = client.utils.get;

  let guildPrefix = serverDoc.prefix;

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

  if(command === 'say'){
    client.commands.get('say').execute(msg, args);
  }

  if(command === 'welcomemessage'){
    client.commands.get('welcomemessage').execute(msg, args, serverModel, Discord);
  }

  if(command === 'leavemessage'){
    client.commands.get('leavemessage').execute(msg, args, serverModel, Discord);
  }

  if(command === 'ms' || command === 'mysingularity'){
    client.commands.get('mysingularity').execute(msg, args, Discord, guildPrefix);
  }
  
  if(command === 'clear'){
    client.commands.get('clear').execute(msg, args, Discord);
  }

  if(command === 'testping'){
    client.commands.get('testping').execute(msg);
  }

  if(command === 'command'){
    client.commands.get('command').execute(msg, args, Discord, guildPrefix, client);
  }

  if(command === 'singularity' || command === 's'){
    client.commands.get('singularity').execute(msg, userMS, Discord, serverDoc);
  }
});
*/

const port = 8000;

app.get('/',function(req,res){
  res.sendFile('C:/Users/samme/Documents/Programs/Singularity/web/index.html');

  //__dirname : It will resolve to your project folder.
});

app.get('/home',function(req,res){
  res.sendFile('C:/Users/samme/Documents/Programs/Singularity/web/index.html');

  //__dirname : It will resolve to your project folder.
});

app.get('/commands',function(req,res){
  res.sendFile('C:/Users/samme/Documents/Programs/Singularity/web/commands.html');

});

app.get('/dashboard',function(req,res){
  res.sendFile('C:/Users/samme/Documents/Programs/Singularity/web/dashboard.html');

});

app.get('/style.css',function(req,res){
  res.sendFile('C:/Users/samme/Documents/Programs/Singularity/web/style.css');
});

app.get('/script.js', function(req,res){
  res.sendFile('C:/Users/samme/Documents/Programs/Singularity/web/script.js');
});

app.get('/hole.ico', function(req,res){
  res.sendFile('C:/Users/samme/Documents/Programs/Singularity/web/hole.ico');
});

app.get('/hole.png', function(req,res){
  res.sendFile('C:/Users/samme/Documents/Programs/Singularity/web/hole.png');
});

app.get('/dropdown.png', function(req,res){
  res.sendFile('C:/Users/samme/Documents/Programs/Singularity/web/dropdown.png');
});



app.listen(port);
console.log('Server started at http://localhost:' + port);


client.login(process.env.TOKEN);