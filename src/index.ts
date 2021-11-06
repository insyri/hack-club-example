// We first import the detritus library to interact with the discord API
import { CommandClient, ShardClient } from "detritus-client";
// CommandClient is the class that handles the commands
// ShardClient is the class that handles the shards

// Shards are split processes that handle the entire client
// When we refer to the word process, think of it as the code that runs
// Think of the whole bot as one process, now split it into 2 or more, each of those slices are shards
// Shards are used to balance workloads of the bot; 1 shard can only handle so much, so we make another shard
// Sharding only really matters when there are about 2000 servers it's being ran in

// We then import the config file to get the token and the prefix
import dotenv from "dotenv";
dotenv.config();
// This is all loaded into the process.env object

const prefix = process.env.PREFIX;
const token = process.env.TOKEN;
// We create the token and prefix variable to shorten our code to be more readable
// Notice if we hover over the variables we can see that it's type a string OR undefined
// TypeScript tells us before hand whenever a variable can be something unexpected
// To make sure the variable type isn't undefined, we can do a type check

// In english, if the variable is null, undefined, or empty, we will stop the process from continuing

if (!token || !prefix)
  throw new Error("Please populate the variables in the .env file");
// If the token or prefix is not set, we throw an error and exit the process
// This tells TypeScript that the token is not undefined, null, or empty

// We then create the client
const client = new ShardClient(token); // We set the token to the token in the config file
// We then create the command client that handles the commands
const commandClient = new CommandClient(client, {
  prefix: prefix,
  ignoreMe: true, // This tells the client to ignore the bot AKA itself
  // This is useful when you don't want the bot to respond to itself
  mentionsEnabled: true, // This tells the client that prefixes can be aliased for mentions
  // "{@bot} ping" is the same as "{prefix} ping"
  useClusterClient: false, // We are already using a shard client, so we don't need to use a cluster client
});

// We then add the commands to the command client
commandClient.add({
  name: "ping",
  run: async (context) => {
    // This command will reply to any user who types !ping with "Pong!"
    // The context is the object that contains the information about the command
    context.reply("Pong!");
  },
});

// Now that we have all our stuff set up and initialized, we can start running the client
// We will spawn the client in async mode so we can await the client to run
(async () => {
  await client.run();
  // We wait for the client to finish the entire ready-up run
  // Once the client fully running, we can tell detritus to register our commands and run them
  await commandClient.run();
  // We wait for the command client to finish the entire ready-up run
  // Once all our commands are registered, we can officially say that the bot is ready to be used!
  console.log("Bot is ready!");
})();
