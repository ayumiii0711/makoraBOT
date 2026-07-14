const path = require('node:path');
require('dotenv').config();

const ASSETS_DIR = path.join(__dirname, 'assets');

const config = {
  token: process.env.DISCORD_TOKEN,
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
