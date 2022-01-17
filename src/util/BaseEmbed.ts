import { MessageEmbed, User } from "discord.js";

export default class BaseEmbed extends MessageEmbed {
	constructor(title: string, user: User) {
		super();
		const currentDate = new Date(Date.now());
		this.setColor(0x000000);
		this.setTitle(title);
		this.setFooter(
			`${title} requested by ${
				user.tag
			} • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`,
			user.displayAvatarURL()
		);
	}
}
