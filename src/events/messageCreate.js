const { AttachmentBuilder } = require('discord.js');
const config = require('../config');
const { detectKeyword } = require('../utils/keywordDetector');
const {
  isActive,
  setActive,
  isChannelOnCooldown,
  markChannelCooldown,
} = require('../state/guildState');

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function sendImage(channel, filePath, name) {
  const attachment = new AttachmentBuilder(filePath, { name });
  await channel.send({ files: [attachment] });
}

async function handleSummon(message) {
  const guildId = message.guild.id;

  if (isActive(guildId)) {
    await message.reply('既に顕現しています。');
    return;
  }

  await sendImage(message.channel, config.assets.summon, 'summon.png');
  await wait(config.timings.summonDelayMs);
  await sendImage(message.channel, config.assets.mahoraga, 'mahoraga.png');
  setActive(guildId, true);
}

async function handleDismiss(message) {
  const guildId = message.guild.id;

  if (!isActive(guildId)) {
    await message.reply('既に送還されています。');
    return;
  }

  await sendImage(message.channel, config.assets.dismiss, 'dismiss.png');
  setActive(guildId, false);
}

async function handleKeyword(message) {
  const guildId = message.guild.id;

  if (!isActive(guildId)) {
    return;
  }

  const detectedKeyword = detectKeyword(message.content);
  if (!detectedKeyword) {
    return;
  }

  if (
    isChannelOnCooldown(
      guildId,
      message.channel.id,
      config.timings.channelCooldownMs,
    )
  ) {
    return;
  }

  // Mark before sending so a failed/slow upload cannot cause response bursts.
  markChannelCooldown(guildId, message.channel.id);
  await sendImage(message.channel, config.assets.adapt, 'adapt.png');
  await message.channel.send('🛞 ガコンッ');
}

async function onMessageCreate(message) {
  if (message.author.bot || !message.guild) {
    return;
  }

  const content = message.content.trim();

  try {
    if (content === config.commands.summon) {
      await handleSummon(message);
      return;
    }

    if (content === config.commands.dismiss) {
      await handleDismiss(message);
      return;
    }

    await handleKeyword(message);
  } catch (error) {
    console.error('Failed to handle messageCreate event:', error);
    await message.channel
      .send('処理中にエラーが発生しました。')
      .catch((sendError) => {
        console.error('Failed to send error message:', sendError);
      });
  }
}

module.exports = {
  onMessageCreate,
};
