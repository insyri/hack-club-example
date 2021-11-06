"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const detritus_client_1 = require("detritus-client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prefix = process.env.PREFIX;
const token = process.env.TOKEN;
if (!token || !prefix)
    throw new Error("Please populate the variables in the .env file");
const client = new detritus_client_1.ShardClient(token);
const commandClient = new detritus_client_1.CommandClient(client, {
    prefix: prefix,
    ignoreMe: true,
    mentionsEnabled: true,
    useClusterClient: false,
});
commandClient.add({
    name: "ping",
    run: async (context) => {
        context.reply("Pong!");
    },
});
(async () => {
    await client.run();
    await commandClient.run();
    console.log("Bot is ready!");
})();
