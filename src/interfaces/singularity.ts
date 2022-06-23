import type { Client, Collection } from "discord.js";
import type { Model } from "mongoose";

import type { User } from "../database/schema/user.js";
import type { Server } from "../database/schema/server.js";
import type Command from "./client/command.js";
import type Context from "./client/context.js";

export default interface Singularity extends Client {
	userModel: Model<User>;
	serverModel: Model<Server>;
	commands: Collection<string, Command>;
	contexts: Collection<string, Context>;
}
