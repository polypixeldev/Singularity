const { MessageEmbed } = require("discord.js");

class BaseEmbed extends MessageEmbed {
  constructor(title, user) {
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

module.exports = BaseEmbed;
