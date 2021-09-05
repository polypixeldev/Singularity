module.exports = {
  name: "ping",
  description: "Responds with the bot's latency and the API latency",
  defaultPermission: true,
  options: [],
  type: "general",
  args: [],
  aliases: [],
  example: "ping",
  execute(client, Discord, msg) {
    const embed = new Discord.MessageEmbed()
      .setDescription(
        `🏓 Latency is ${
          Date.now() - msg.createdTimestamp
        }ms. API Latency is ${Math.round(client.ws.ping)}ms`
      )
      .setColor(0x000000);

    msg.channel.send({ embeds: [embed] });
  },
  async slashExecute(client, Discord, interaction) {
    await interaction.deferReply({ ephemeral: true });
    let latestEmbed = new Discord.MessageEmbed()
      .setDescription(
        `🏓 Latency is ${
          Date.now() - interaction.createdTimestamp
        }ms. API Latency is ${Math.round(client.ws.ping)}ms`
      )
      .setColor(0x000000)
      .setFooter("get ponged lol");

    interaction
      .editReply({
        embeds: [latestEmbed],
        components: [
          {
            type: "ACTION_ROW",
            components: [
              {
                type: "BUTTON",
                label: "Retest",
                style: "PRIMARY",
                customId: "retest",
              },
            ],
          },
        ],
      })
      .then((reply) => {
        let collector = reply.createMessageComponentCollector({
          componentType: "BUTTON",
          time: 300000,
          dispose: true,
        });

        collector.on("collect", async (press) => {
          if (press.user.id !== interaction.user.id) {
            const embed = new Discord.MessageEmbed()
              .setColor(0x000000)
              .setDescription("You cannot perform this action!");

            press.reply({ embeds: [embed] });
          } else {
            await press.deferUpdate();

            const embed = new Discord.MessageEmbed()
              .setDescription(
                `🏓 Latency is ${
                  Date.now() - press.createdTimestamp
                }ms. API Latency is ${Math.round(client.ws.ping)}ms`
              )
              .setColor(0x000000)
              .setFooter("get ponged again lol");

            latestEmbed = embed;

            press.editReply({ embeds: [embed] });
          }
        });

        collector.on("end", () => {
          interaction.editReply({
            components: [
              {
                type: "ACTION_ROW",
                components: [
                  {
                    type: "BUTTON",
                    label: "Retest",
                    style: "PRIMARY",
                    customId: "retest",
                    disabled: true,
                  },
                ],
              },
            ],
            embeds: [latestEmbed],
          });
        });
      });
  },
};
