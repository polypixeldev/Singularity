module.exports = {
  name: "set",
  description:
    "Set the protons/electrons/dark matter of other My Singularity users",
  type: "ms",
  options: [
    {
      name: "user",
      description: "The user you want to manage",
      type: "USER",
      required: true,
    },
    {
      name: "type",
      description: "The type you want to change",
      type: "STRING",
      required: true,
      choices: [
        {
          name: "Protons",
          value: "protons",
        },
        {
          name: "Electrons",
          value: "electrons",
        },
        {
          name: "Dark Matter",
          value: "darkMatter",
        },
      ],
    },
    {
      name: "value",
      description:
        "The new value - prefix it with + or - to add or subtract from the current value",
      type: "STRING",
      required: true,
    },
  ],
  args: [],
  aliases: [],
  example: "ms mod set @user protons +100",
  async execute(client, Discord, msg, args, serverDoc) {
    let user = msg.mentions.users.first();

    if (!user) {
      user = client.utils.resolveTag(msg.guild, args[2]);
      if (!user) {
        const embed = new Discord.MessageEmbed()
          .setColor(0x000000)
          .setDescription("You did not mention/tag a user!");

        return msg.channel.send({ embeds: [embed] });
      }
    }

    let type =
      args[3] === "protons" ||
      args[3] === "electrons" ||
      args[3] === "darkMatter";
    if (!type) {
      const embed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setDescription(
          "You did not specify a valid type! (Must be `protons`, `electrons`, or `darkMatter`)"
        );

      return msg.channel.send({ embeds: [embed] });
    }
    if (!args[4]) {
      const embed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setDescription("You did not specify a value!");

      return msg.channel.send({ embeds: [embed] });
    }

    let mode = args[4].startsWith("+")
      ? "add"
      : args[4].startsWith("-")
      ? "subtract"
      : "set";

    if (isNaN(args[4].slice(1))) {
      const embed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setDescription("The value provided is invalid!");

      return msg.channel.send({ embeds: [embed] });
    }

    let userMS = await client.utils.loadUserInfo(client, serverDoc, user.id);

    if (mode === "add") {
      userMS[args[3]] += Number(args[4].slice(1));
    } else if (mode === "subtract") {
      userMS[args[3]] -= Number(args[4].slice(1));
    } else {
      userMS[args[3]] = args[4];
    }

    client.utils
      .updateUser(client, serverDoc.guildID, userMS.userID, userMS)
      .then(() => {
        const embed = new Discord.MessageEmbed().setColor(0x000000)
          .setDescription(`
				Set Successful
			`);

        return msg.channel.send({ embeds: [embed] });
      });
  },
  async slashExecute(client, Discord, interaction, serverDoc) {
    let user = interaction.options.get("user").user;
    let type = interaction.options.get("type").value;
    let value = interaction.options.get("value").value;
    let mode = value.startsWith("+")
      ? "add"
      : value.startsWith("-")
      ? "subtract"
      : "set";

    if (isNaN(Number(value.slice(1)))) {
      const embed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setDescription("The value provided is invalid!");

      return interaction.editReply({ embeds: [embed] });
    }

    let userMS = await client.utils.loadUserInfo(client, serverDoc, user.id);

    if (mode === "add") {
      userMS[type] += Number(value.slice(1));
    } else if (mode === "subtract") {
      userMS[type] -= Number(value.slice(1));
    } else {
      userMS[type] = value;
    }

    client.utils
      .updateUser(client, serverDoc.guildID, userMS.userID, userMS)
      .then(() => {
        const embed = new Discord.MessageEmbed().setColor(0x000000)
          .setDescription(`
				Set Successful
			`);

        return interaction.editReply({ embeds: [embed] });
      });
  },
};
