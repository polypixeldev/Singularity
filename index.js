require('./website/server.js').start("backend")

/*
REMINDERS:
 -Server perks system
 -Improve profile system (black hole upgrade system)
 -Make code cleaner (unnecessary arguments, pass config)
*/

// const Sentry = require("@sentry/node");
// const Tracing = require("@sentry/tracing"); //eslint-disable-line

// Sentry.init({
//   dsn: "https://d38245378f464bdeb3d02ca1cb6af6f9@o920118.ingest.sentry.io/5865017",
//   release: 'Singularity@0.1.0',
//   tracesSampleRate: 1.0,
//   integrations: [
//     new Sentry.Integrations.Http({ tracing: true }),
//   ],
//   environment: 'development'
// });

// Sentry.setTag("appProcess", "bot-core");

// const startupTransaction = Sentry.startTransaction({
//   op: 'Startup',
//   name: 'Startup'
// });

// Sentry.configureScope(scope => {
//   scope.setSpan(startupTransaction);
// });

// const Discord = require('discord.js');
// const client = new Discord.Client({partials: ["REACTION", "MESSAGE"]});
// const mongoose = require('mongoose');

// const API = require('./website/backend/server.js');

// require('dotenv').config();

// const url = 'mongodb://127.0.0.1:27017/Singularity';

// API.start('full');
// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
// const databaseConnectionTransaction = startupTransaction.startChild({
//   op: 'connection',
//   name: 'Database Connection'
// });

// const db = mongoose.connection;
// db.once('open', () => {
//   databaseConnectionTransaction.finish();
//   console.log('Database connected:', url);
//   client.msSchema = new mongoose.Schema({
//     userID: String,
//     protons: Number,
//     electrons: Number,
//     darkMatter: Number,
//     lifeExp: Number,
//     items: Array,
//     powerUps: Array,
//     singularity: Object
//   });
  
//   const serverSchema = new mongoose.Schema({
//     guildID: String,
//     prefix: String,
//     welcomeMessage: String,
//     welcomeChannelID: String,
//     leaveChannelID: String,
//     leaveMessage: String,
//     reactionRoles: Array,
//     ms: [client.msSchema]
//   });
  
//   client.serverModel = mongoose.model('serverModel', serverSchema);
  
//   client.commands = new Discord.Collection();
//   client.events = new Discord.Collection();
//   client.utils = {};
  
//   ['command_handler', 'event_handler', 'util_handler'].forEach(handler =>{
//       require(`./handlers/${handler}`)(Discord, client);
//   });
  
//   client.login(process.env.TOKEN);
//   const loginTransaction = startupTransaction.startChild({
//     op: 'connection',
//     name: 'Login to Discord API'
//   });
//   client.once('ready', () => {
//     loginTransaction.finish();
//   })
// });

// db.on('error', err => {
//   console.error('connection error:', err)
// });