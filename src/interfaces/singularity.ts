import type { Client, Collection } from "discord.js";
import type { Model } from "mongoose";

import type { User } from "../database/schema/user.js";
import type { Server } from "../database/schema/server.js";
import type Command from "./client/Command.js";
import type Context from "./client/Context.js";

export default interface Singularity extends Client {
	userModel: Model<User>;
	serverModel: Model<Server>;
	commands: Collection<string, Command>;
	contexts: Collection<string, Context>;
}
