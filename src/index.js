const { Client, GatewayIntentBits, Events } = require('discord.js');
const config = require('./config');
const { onMessageCreate } = require('./events/messageCreate');

if (!config.token) {
  const visibleTokenKeys = config.tokenEnvKeys.filter((key) => process.env[key]);
  console.error(
    `Discord token is not set. Add one Railway variable named ${config.tokenEnvKeys.join(' or ')}.`,
  );
  console.error(
    `Visible token variable names: ${visibleTokenKeys.length > 0 ? visibleTokenKeys.join(', ') : 'none'}`,
  );
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Logged in as ${readyClient.user.tag}`);
});

client.on(Events.MessageCreate, onMessageCreate);

client.on(Events.Error, (error) => {
  console.error('Discord client error:', error);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled promise rejection:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  process.exit(1);
});

client.login(config.token);
