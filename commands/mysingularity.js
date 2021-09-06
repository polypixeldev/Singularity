const Shop = require("./mysingularity/shop/view.js");
const Upgrade = require("./mysingularity/upgrade.js");
const Use = require("./mysingularity/use.js");
const Info = require("./mysingularity/info.js");
const Prestige = require("./mysingularity/prestige.js");
const Rares = require("./mysingularity/rare.js");
const View = require("./mysingularity/view.js");

module.exports = {
  name: "mysingularity",
  description: "Manage your Singularity and view the Singularities of others!",
  defaultPermission: true,
  options: [],
  // options: [{
  // 	name: 'view',
  // 	description: 'View yours and others Singularities',
  // 	type: 'SUB_COMMAND'
  // }, {
  // 	name: 'upgrade',
  // 	description: 'Upgrade your Singularity',
  // 	type: 'SUB_COMMAND'
  // }, {
  // 	name: 'use',
  // 	description: 'Use a power-up!',
  // 	type: 'SUB_COMMAND'
  // }, {
  // 	name: 'info',
  // 	description: 'Display info about My Singularity',
  // 	type: 'SUB_COMMAND'
  // }, {
  // 	name: 'prestige',
  // 	description: 'Prestige your Singularity!',
  // 	type: 'SUB_COMMAND'
  // }, {
  // 	name: 'rare',
  // 	description: 'Display the list of Rare Items',
  // 	type: 'SUB_COMMAND'
  // }, {
  // 	name: 'shop',
  // 	description: 'Use the My Singularity Shop!',
  // 	type: 'SUB_COMMAND_GROUP'
  // }, {
  // 	name: 'mod',
  // 	description: 'Moderate My Singularity',
  // 	type: 'SUB_COMMAND_GROUP'
  // }],
  type: "ms",
  args: ["!<@user | upgrade | shop>"],
  aliases: ["ms"],
  example: "singularity",
  async execute(client, Discord, msg, args, serverDoc) {
    const items = [
      {
        name: "Tiny Trophy",
        protons: 1000000,
        electrons: 500000,
        darkMatter: 0,
      },
      {
        name: "Regular Trophy",
        protons: 10000000,
        electrons: 1000000,
        darkMatter: 1,
      },
      {
        name: "Giant Trophy",
        protons: 1000000000,
        electrons: 10000000,
        darkMatter: 5,
      },
    ];

    const powerUps = [
      {
        name: "2x Proton Boost",
        protons: 0,
        electrons: 500,
        darkMatter: 0,
        time: 10000,
      },
      {
        name: "2x Electron Boost",
        protons: 5000,
        electrons: 0,
        darkMatter: 0,
        time: 10000,
      },
    ];

    const rareItems = [
      {
        name: "Wormhole Relic",
        description:
          "An ancient relic from the early days of the universe when wormholes were common",
      },
      {
        name: "Space String",
        description: "A piece of the string that holds spacetime together",
      },
      {
        name: "???",
        description: "Nobody knows exactly what this is...",
      },
    ];

    if (args[0] === "upgrade") {
      Upgrade.execute(client, Discord, msg, args, serverDoc);
    } else if (args[0] === "shop") {
      Shop.execute(client, Discord, msg, args, serverDoc, items, powerUps);
    } else if (args[0] === "use") {
      Use.execute(client, Discord, msg, args, serverDoc, items, powerUps);
    } else if (args[0] === "info") {
      Info.execute(client, Discord, msg, args, serverDoc);
    } else if (args[0] === "prestige") {
      Prestige.execute(client, Discord, msg, args, serverDoc, rareItems);
    } else if (args[0] === "rare") {
      Rares.execute(client, Discord, msg, args, serverDoc, rareItems);
    } else {
      View.execute(client, Discord, msg, args, serverDoc);
    }
  },
};
