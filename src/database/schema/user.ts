import { Schema } from "mongoose";

import Item from "../../interfaces/database/item";
import ActiveItem from "../../interfaces/database/activeitem";
import UserSingularity from "../../interfaces/database/usersingularity";
import Infraction from "../../interfaces/database/infraction";

export interface User {
	userID: string;
	guildID: string;
	protons: number;
	electrons: number;
	darkMatter: number;
	lifeExp: number;
	items: Item[];
	rareItems: Item[];
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
