module.exports = {
  name: "prestige",
  description: "Prestige your Singularity!",
  defaultPermission: true,
  options: [
    {
      name: "info",
      description:
        'Enter "info" to display information about Singularity Prestige',
      type: "STRING",
      required: false,
    },
  ],
  args: [],
  aliases: [],
  example: "ms prestige",
  async slashExecute(client, Discord, interaction, serverDoc, rareItems) {
    await interaction.deferReply({ ephemeral: true });
    let userMS = await client.utils.loadUserInfo(
      client,
      serverDoc,
      interaction.user.id
    );
    let baseReq =
      (userMS.singularity.prestige + 2) *
      ((userMS.singularity.prestige + 2) * 2);

    if (interaction.options.get("info") === "info") {
      let currentDate = new Date(Date.now());
      const embed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setTitle("Singularity Prestige")
        .setDescription(
          `
				Is your Singularity so big that the universe is beginning to collapse in on itself? If so, it may be time to prestige.

				**What is Singularity Prestige?**
				Singularity Prestige is your way to massively upgrade your Singularity. When your Singularity gets too powerful, it begins to have negative effects on itself. By prestiging, you can stop your Singularity from dying and condense its power into something your new Singularity can use.

				**Requirements:**
				You have prestiged **${
          userMS.singularity.prestige
        }** times, so your next prestige will cost you:
				- **${baseReq * 125000}** Protons
				- **${baseReq * 41666}** Electrons
				- **${baseReq * 6}** Dark Matter

				**Effects:**
				This prestige will get you **${
          userMS.singularity.prestige + 2
        }** random items from the Rare Items list (\`${
            serverDoc.prefix
          }ms rare\`), as well as a new type of Singularity
			
				*Your Lifetime Experience will not be affected*
			`
        )
        .setFooter(
          `Singularity Prestige Info requested by ${
            interaction.user.tag
          } • ${currentDate.getUTCMonth()}/${currentDate.getUTCDate()}/${currentDate.getUTCFullYear()} @ ${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} UTC`,
          interaction.user.displayAvatarURL()
        );

      return interaction.editReply({ embeds: [embed] });
    } else {
      if (
        userMS.protons >= baseReq * 125000 &&
        userMS.electrons >= baseReq * 41666 &&
        userMS.darkMatter >= baseReq * 6
      ) {
        const firstEmbed = new Discord.MessageEmbed()
          .setColor(0x000000)
          .setTitle("Are You Sure?").setDescription(`
					Prestiging has many benefits, but it is a destructive action. **Prestiging is not reversible.**

					If you are sure you want to prestige now, click \`Yes\`

					If not, click \`No\`
				`);

        let confirmation = await interaction.editReply({
          embeds: [firstEmbed],
          components: [
            {
              type: "ACTION_ROW",
              components: [
                {
                  type: "BUTTON",
                  label: "Yes",
                  customId: "Yes",
                  style: "SUCCESS",
                },
                {
                  type: "BUTTON",
                  label: "No",
                  customId: "No",
                  style: "DANGER",
                },
              ],
            },
          ],
        });

        confirmation
          .awaitMessageComponent({
            time: 30000,
            filter: (answer) => answer.user.id === interaction.user.id,
          })
          .then(async (answer) => {
            await answer.deferReply({ ephemeral: true });
            if (answer.customId === "Yes") {
              const newServerDoc = await client.utils.loadGuildInfo(
                client,
                interaction.guild
              );
              let newUserMS = await client.utils.loadUserInfo(
                client,
                newServerDoc,
                interaction.user.id
              );

              newUserMS.userID = interaction.user.id;
              newUserMS.protons = 0;
              newUserMS.electrons = 0;
              newUserMS.items = [];
              for (let i = 0; i < newUserMS.singularity.prestige + 2; i++) {
                newUserMS.rareItems.push(
                  rareItems[Math.floor(Math.random() * rareItems.length - 1)]
                );
              }
              newUserMS.powerUps = [];
              newUserMS.darkMatter = 0;
              newUserMS.active = [];
              newUserMS.singularity = {
                type: "White",
                size: 10,
                ferocity: newUserMS.singularity.ferocity + 5,
                prestige: newUserMS.singularity.prestige + 1,
              };

              client.utils
                .updateUser(
                  client,
                  newServerDoc.guildID,
                  newUserMS.userID,
                  newUserMS
                )
                .then(() => {
                  interaction.editReply({
                    embeds: [firstEmbed],
                    components: [
                      {
                        type: "ACTION_ROW",
                        components: [
                          {
                            type: "BUTTON",
                            label: "Yes",
                            customId: "Yes",
                            style: "SUCCESS",
                            disabled: true,
                          },
                          {
                            type: "BUTTON",
                            label: "No",
                            customId: "No",
                            style: "DANGER",
                            disabled: true,
                          },
                        ],
                      },
                    ],
                  });
                  const embed = new Discord.MessageEmbed()
                    .setColor(0x000000)
                    .setDescription("Congratulations! Prestige Successful!");

                  return answer.editReply({ embeds: [embed] });
                });
            } else {
              interaction.editReply({
                embeds: [firstEmbed],
                components: [
                  {
                    type: "ACTION_ROW",
                    components: [
                      {
                        type: "BUTTON",
                        label: "Yes",
                        customId: "Yes",
                        style: "SUCCESS",
                        disabled: true,
                      },
                      {
                        type: "BUTTON",
                        label: "No",
                        customId: "No",
                        style: "DANGER",
                        disabled: true,
                      },
                    ],
                  },
                ],
              });
              const embed = new Discord.MessageEmbed()
                .setColor(0x000000)
                .setDescription("Prestige Aborted");

              return answer.editReply({ embeds: [embed] });
            }
          });
      } else {
        const embed = new Discord.MessageEmbed().setColor(0x000000)
          .setDescription(`
					*You do not have enough resources to prestige! You need:*
					- **${baseReq * 125000}** Protons
					- **${baseReq * 41666}** Electrons
					- **${baseReq * 6}** Dark Matter

					*Enter \`${
            serverDoc.prefix
          }ms prestige info\` to learn more about Singularity Prestige*
				`);

        return interaction.editReply({ embeds: [embed] });
      }
    }
  },
};
