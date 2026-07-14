const path = require('node:path');
require('dotenv').config();

const ASSETS_DIR = path.join(__dirname, 'assets');
const TOKEN_ENV_KEYS = ['DISCORD_TOKEN', 'DISCORD_BOT_TOKEN', 'BOT_TOKEN'];

function getTokenFromEnv() {
  return TOKEN_ENV_KEYS.map((key) => process.env[key])
    .find((value) => value && value !== 'YOUR_BOT_TOKEN_HERE');
}

const config = {
  token: getTokenFromEnv(),
  tokenEnvKeys: TOKEN_ENV_KEYS,
  commands: {
    summon: '布瑠部由良由良',
    dismiss: '開',
  },
  timings: {
    summonDelayMs: 5000,
    channelCooldownMs: 5000,
  },
  assets: {
    summon: path.join(ASSETS_DIR, 'summon.png'),
    mahoraga: path.join(ASSETS_DIR, 'mahoraga.png'),
    adapt: path.join(ASSETS_DIR, 'adapt.png'),
    dismiss: path.join(ASSETS_DIR, 'dismiss.png'),
  },
};

module.exports = config;
