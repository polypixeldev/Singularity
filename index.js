require("dotenv").config();

const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing"); //eslint-disable-line

Sentry.init({
	dsn: "https://d38245378f464bdeb3d02ca1cb6af6f9@o920118.ingest.sentry.io/5865017",
	release: "Singularity@0.1.0",
	tracesSampleRate: 1.0,
	integrations: [new Sentry.Integrations.Http({ tracing: true })],
	environment: process.env.SENTRY_ENVIRONMENT,
});

const startupTransaction = Sentry.startTransaction({
	op: "Startup",
	name: "Startup",
});

Sentry.configureScope((scope) => {
	scope.setSpan(startupTransaction);
});

const Discord = require("discord.js");
const mongoose = require("mongoose");
const cron = require("node-cron");
const APIClient = require("./website/server.js");

const client = new Discord.Client({
	partials: ["REACTION", "MESSAGE", "CHANNEL"],
	intents: [
		"GUILDS",
		"GUILD_MEMBERS",
		"GUILD_BANS",
		"GUILD_MESSAGES",
		"GUILD_MESSAGE_REACTIONS",
		"DIRECT_MESSAGES",
	],
	failIfNotExists: true,
});
const api = new APIClient({
	type: process.env.API_TYPE,
	host: process.env.API_HOST,
	port: process.env.API_PORT,
});

mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const databaseConnectionTransaction = startupTransaction.startChild({
	op: "connection",
	name: "Database Connection",
});

const db = mongoose.connection;
db.once("open", () => {
	databaseConnectionTransaction.finish();
	console.log("Database connected:", process.env.MONGODB_URI);
	const userSchema = new mongoose.Schema({
		userID: String,
		guildID: String,
		protons: Number,
		electrons: Number,
		darkMatter: Number,
		lifeExp: Number,
		items: Array,
		rareItems: Array,
		active: Array,
		activity: Date,
		singularity: Object,
		infractions: Array,
	});

	const serverSchema = new mongoose.Schema({
		guildID: String,
		welcomeMessage: String,
		welcomeChannelID: String,
		leaveChannelID: String,
		leaveMessage: String,
		reactionRoles: Array,
		ms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
		items: Array,
		types: Array,
	});

	userSchema.index({ guildID: 1, userID: -1 });
	serverSchema.index({ guildID: 1 });

	client.userModel = mongoose.model("Users", userSchema);
	client.serverModel = mongoose.model("Servers", serverSchema);

	client.commands = new Discord.Collection();
	client.contexts = new Discord.Collection();
	client.events = new Discord.Collection();
	client.utils = {};

	client.login(process.env.DISCORD_TOKEN);
	const loginTransaction = startupTransaction.startChild({
		op: "connection",
		name: "Login to Discord API",
	});

	client.once("ready", () => {
		console.log("Singularity is now online");

		client.user.setPresence({
			activities: [{ name: "singularitybot.glitch.me", type: "WATCHING" }],
			status: "online",
		});

		["command_handler", "event_handler", "util_handler"].forEach((handler) => {
			require(`./handlers/${handler}`)(Discord, client, api);
		});

		cron.schedule("0 0 * * *", () => client.utils.checkActivity(client), {
			timezone: "America/New_York",
		});

		loginTransaction.finish();
	});
});

db.on("error", (err) => {
	console.error("connection error:", err);
});
