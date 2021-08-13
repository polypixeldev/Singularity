const prettyMS = require("pretty-ms");

module.exports = {
  name: "view",
  description: "View people's Singularity!",
  options: [
    {
      name: "user",
      description: "The user that you want to view - defaults to yourself",
      type: "USER",
      required: false,
    },
  ],
  async execute(client, Discord, msg, args, serverDoc) {
    //eslint-disable-line
    let user = msg.mentions.users.first()
      ? msg.mentions.users.first()
      : client.utils.resolveTag(msg.guild, args[0])
      ? client.utils.resolveTag(msg.guild, args[0])
      : msg.author;
    if (user.bot) {
      const embed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setDescription(
          "Bots are not powerful enough to have their own Singularity!"
        );

      return msg.channel.send({ embeds: [embed] });
    }
    let userMS = await client.utils.loadUserInfo(client, serverDoc, user.id);

    let itemStr = "\n";
    for (let item of userMS.items) {
      itemStr = itemStr + `- **${item}** \n `;
    }
    if (itemStr === "\n") itemStr = "**None**";

    let pStr = "\n";
    for (let p of userMS.powerUps) {
      pStr = pStr + `- **${p}** \n `;
    }
    if (pStr === "\n") pStr = "**None**";

    let aStr = "\n";
    for (let a of userMS.active) {
      aStr =
        aStr +
        `- **${a.name}** - ${prettyMS(a.time - (Date.now() - a.start))}** \n `;
    }
    if (aStr === "\n") aStr = "**None**";

    let rareStr = "";
    for (let rare of userMS.rareItems) {
      rareStr = rareStr + "\n";
      rareStr = rareStr + `- **${rare.name}**`;
    }
    if (rareStr === "") rareStr = "**None**";

    let currentDate = new Date(Date.now());
    const embed = new Discord.MessageEmbed()
      .setTitle(`${user.tag}'s Singularity`)
      .setColor(0x000000)
      //.setThumbnail('https://cdn.discordapp.com/avatars/835256019336036423/05dde3d48f1a67659be4837607746eb7.webp')
      .setThumbnail(user.displayAvatarURL())
      .addField(
        "User Stats",
        `
			Protons: **${userMS.protons}**
			Electrons: **${userMS.electrons}**
			Dark Matter: **${userMS.darkMatter}**
			Items: ${itemStr}
			Rare Items: ${rareStr}
			Power-Ups: ${pStr}
			Active Power-Ups: ${aStr}
			Lifetime Experience: **${userMS.lifeExp}**
		`
      )
      .addField(
        "Singularity Stats",
        `
			Singularity Type: **${userMS.singularity.type}**
			Singularity Size: **${userMS.singularity.size}**
			Singularity Ferocity: **${userMS.singularity.ferocity}**
			Times Prestiged: **${userMS.singularity.prestige}**
		`
      )
      // .setDescription(`
      // 	***----USER STATS----***
      // 	Protons: **${userMS.protons}**
      // 	Electrons: **${userMS.electrons}**
      // 	Dark Matter: **${userMS.darkMatter}**
      // 	Items: ${itemStr}
      // 	Rare Items: ${rareStr}
      // 	Power-Ups: ${pStr}
      // 	Active Power-Ups: ${aStr}
      // 	Lifetime Experience: **${userMS.lifeExp}**

      // 	***----SINGULARITY STATS----***
      // 	Singularity Type: **${userMS.singularity.type}**
      // 	Singularity Size: **${userMS.singularity.size}**
      // 	Singularity Ferocity: **${userMS.singularity.ferocity}**
      // 	Times Prestiged: **${userMS.singularity.prestige}**
      // `)
      .setFooter(
        `${user.tag}'s Singularity requested by ${
          msg.author.tag
        } • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`,
        msg.author.displayAvatarURL()
      );

    msg.channel.send({ embeds: [embed] });
  },
  async slashExecute(client, Discord, interaction, serverDoc) {
    let user = interaction.options.get("user")?.user ?? interaction.user;
    if (user.bot) {
      const embed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setDescription(
          "Bots are not powerful enough to have their own Singularity!"
        );

      return interaction.editReply({ embeds: [embed] });
    }
    let userMS = await client.utils.loadUserInfo(client, serverDoc, user.id);

    let itemStr = "\n";
    for (let item of userMS.items) {
      itemStr = itemStr + `- **${item}** \n `;
    }
    if (itemStr === "\n") itemStr = "**None**";

    let pStr = "\n";
    for (let p of userMS.powerUps) {
      pStr = pStr + `- **${p}** \n `;
    }
    if (pStr === "\n") pStr = "**None**";

    let aStr = "\n";
    for (let a of userMS.active) {
      aStr =
        aStr +
        `- **${a.name}** - ${prettyMS(a.time - (Date.now() - a.start))}** \n `;
    }
    if (aStr === "\n") aStr = "**None**";

    let rareStr = "";
    for (let rare of userMS.rareItems) {
      rareStr = rareStr + "\n";
      rareStr = rareStr + `- **${rare.name}**`;
    }
    if (rareStr === "") rareStr = "**None**";

    let currentDate = new Date(Date.now());
    const embed = new Discord.MessageEmbed()
      .setTitle(`${user.tag}'s Singularity`)
      .setColor(0x000000)
      //.setThumbnail('https://cdn.discordapp.com/avatars/835256019336036423/05dde3d48f1a67659be4837607746eb7.webp')
      .setThumbnail(user.displayAvatarURL())
      .addField(
        "User Stats",
        `
			Protons: **${userMS.protons}**
			Electrons: **${userMS.electrons}**
			Dark Matter: **${userMS.darkMatter}**
			Items: ${itemStr}
			Rare Items: ${rareStr}
			Power-Ups: ${pStr}
			Active Power-Ups: ${aStr}
			Lifetime Experience: **${userMS.lifeExp}**
		`
      )
      .addField(
        "Singularity Stats",
        `
			Singularity Type: **${userMS.singularity.type}**
			Singularity Size: **${userMS.singularity.size}**
			Singularity Ferocity: **${userMS.singularity.ferocity}**
			Times Prestiged: **${userMS.singularity.prestige}**
		`
      )
      // .setDescription(`
      // 	***----USER STATS----***
      // 	Protons: **${userMS.protons}**
      // 	Electrons: **${userMS.electrons}**
      // 	Dark Matter: **${userMS.darkMatter}**
      // 	Items: ${itemStr}
      // 	Rare Items: ${rareStr}
      // 	Power-Ups: ${pStr}
      // 	Active Power-Ups: ${aStr}
      // 	Lifetime Experience: **${userMS.lifeExp}**

      // 	***----SINGULARITY STATS----***
      // 	Singularity Type: **${userMS.singularity.type}**
      // 	Singularity Size: **${userMS.singularity.size}**
      // 	Singularity Ferocity: **${userMS.singularity.ferocity}**
      // 	Times Prestiged: **${userMS.singularity.prestige}**
      // `)
      .setFooter(
        `${user.tag}'s Singularity requested by ${
          interaction.user.tag
        } • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`,
        interaction.user.displayAvatarURL()
      );

    interaction.editReply({ embeds: [embed] });
  },
};
