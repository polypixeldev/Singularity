import { Client, Collection } from "discord.js";
import { Model } from "mongoose";

import { User } from "../database/schema/user";
import { Server } from "../database/schema/server";
import Command from "./client/command";
import Context from "./client/context";

export default interface Singularity extends Client {
	userModel: Model<User>;
	serverModel: Model<Server>;
	commands: Collection<string, Command>;
	contexts: Collection<string, Context>;
}
