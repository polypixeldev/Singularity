import { Schema } from "mongoose";
import { Snowflake } from "discord.js";

import ActiveItem from "../../interfaces/user/activeitem";
import UserSingularity from "../../interfaces/user/usersingularity";
import Infraction from "../../interfaces/user/infraction";

export interface User {
	userID: Snowflake;
	guildID: Snowflake;
	protons: number;
	electrons: number;
	darkMatter: number;
	lifeExp: number;
	items: string[];
	rareItems: string[];
	active: ActiveItem[];
	activity: Date;
	singularity: UserSingularity;
	infractions: Infraction[];
}

export const UserSchema = new Schema({
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
