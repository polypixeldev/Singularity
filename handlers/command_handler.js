const fs = require("fs");

module.exports = (Discord, client) => {
  console.log("Loading Slash (/) Command Data...");
  console.time("Finished Loading Slash (/) Command Data in");

  const command_files = fs
    .readdirSync("./commands/")
    .filter((file) => file.endsWith("js"));

  let basicCmds = new Discord.Collection();
  for (const file of command_files) {
    const command = require(`../commands/${file}`);
    if (command.name) {
      basicCmds.set(command.name, command);
    } else {
      continue;
    }
  }

  client.user.id = process.env.CLIENT_ID;
  let slashCommands = basicCmds.map((command) => {
    let slashCmd = {
      name: command.name,
      type: command.type,
      description: command.description,
      options: command.options,
      defaultPermission: command.defaultPermission,
      execute: command.execute,
      slashExecute: command.slashExecute,
    };
    if (fs.existsSync(`./commands/${command.name}/`)) {
      let sub_dir = fs.readdirSync(`./commands/${command.name}/`, {
        withFileTypes: true,
      });
      for (let ent of sub_dir) {
        if (ent.isDirectory()) {
          if (ent.name === command.name) continue;
          let grp_meta = require(`../commands/${command.name}/${ent.name}/.meta.js`);
          let index =
            slashCmd.options.push({
              name: ent.name,
              description: grp_meta.description,
              type: "SUB_COMMAND_GROUP",
              options: [],
            }) - 1;
          let subgrp_cmds = fs
            .readdirSync(`./commands/${command.name}/${ent.name}/`)
            .filter((file) => file.endsWith("js"));
          for (let subgrp_cmd_name of subgrp_cmds) {
            if (subgrp_cmd_name === ".meta.js") continue;
            const subgrp_cmd = require(`../commands/${command.name}/${ent.name}/${subgrp_cmd_name}`);
            slashCmd.options[index].options.push({
              name: subgrp_cmd.name,
              description: subgrp_cmd.description,
              type: "SUB_COMMAND",
              options: subgrp_cmd.options,
              execute: subgrp_cmd.execute,
              slashExecute: subgrp_cmd.slashExecute,
            });
          }
        } else if (ent.name.endsWith("js")) {
          let sub_cmd = require(`../commands/${command.name}/${ent.name}`);
          slashCmd.options.push({
            name: sub_cmd.name,
            description: sub_cmd.description,
            type: "SUB_COMMAND",
            options: sub_cmd.options,
            execute: sub_cmd.execute,
            slashExecute: sub_cmd.slashExecute,
          });
        }
      }
    }
    client.commands.set(slashCmd.name, slashCmd);
    return slashCmd;
  });

  console.timeEnd("Finished Loading Slash (/) Command Data in");

  console.log("Loading Context Menu Data...");
  console.time("Finished Loading Context Menu Data in");

  const context_files = fs
    .readdirSync("./contexts/")
    .filter((file) => file.endsWith("js"));

  for (const file of context_files) {
    const context = require(`../contexts/${file}`);
    if (context.name) {
      client.contexts.set(context.name, context);
      slashCommands.push({
        name: context.name,
        type: context.type,
      });
    } else {
      continue;
    }
  }

  console.timeEnd("Finished Loading Context Menu Data in");

  console.log("Singularity Commands Set");

  if (process.argv[2] === "-d") {
    console.log(
      `Sending Slash (/) Command Data to Discord for Guild ${process.env.DEV_GUILD_ID}...`
    );
    if (!process.env.DEV_GUILD_ID) {
      throw new ReferenceError("The development guild ID is not set!");
    }
    console.time(
      `Finished Sending Slash (/) Command Data to Discord for Guild ${process.env.DEV_GUILD_ID} in`
    );

    client.application.commands
      .set(slashCommands, process.env.DEV_GUILD_ID)
      .then(() => {
        console.timeEnd(
          `Finished Sending Slash (/) Command Data to Discord for Guild ${process.env.DEV_GUILD_ID} in`
        );
      });
  } else if (process.argv[2] === "-D") {
    console.log(`Sending Slash (/) Command Data to Discord Globally`);
    console.time(
      `Finished Sending Slash (/) Command Data to Discord Globally in`
    );
    client.application.commands.set(slashCommands).then(() => {
      console.timeEnd(
        `Finished Sending Slash (/) Command Data to Discord Globally in`
      );
    });
  } else if (process.argv[2] === "-r") {
    console.log(
      `Removing All Slash (/) Commands from Guild ${process.env.DEV_GUILD_ID}...`
    );
    console.time(
      `Removed All Slash (/) Commands from Guild ${process.env.DEV_GUILD_ID} in`
    );
    client.application.commands.set([], process.env.DEV_GUILD_ID).then(() => {
      console.timeEnd(
        `Removed All Slash (/) Commands from Guild ${process.env.DEV_GUILD_ID} in`
      );
    });
  } else if (process.argv[2] === "-R") {
    console.log(`Removing All Slash (/) Commands Globally...`);
    console.time(`Removed All Slash (/) Commands Globally in`);
    client.application.commands.set([]).then(() => {
      console.timeEnd(`Removed All Slash (/) Commands Globally in`);
    });
  }
};
