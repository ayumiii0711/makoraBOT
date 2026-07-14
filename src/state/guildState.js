const guildStates = new Map();

function createDefaultState() {
  return {
    // In-memory state is intentionally isolated by guild for multi-server use.
    active: false,
    channelCooldowns: new Map(),
  };
}

function getGuildState(guildId) {
  if (!guildStates.has(guildId)) {
    guildStates.set(guildId, createDefaultState());
  }

  return guildStates.get(guildId);
}

function isActive(guildId) {
  return getGuildState(guildId).active;
}

function setActive(guildId, active) {
  getGuildState(guildId).active = active;
}

function isChannelOnCooldown(guildId, channelId, cooldownMs) {
  const state = getGuildState(guildId);
  const lastTriggeredAt = state.channelCooldowns.get(channelId) ?? 0;

  return Date.now() - lastTriggeredAt < cooldownMs;
}

function markChannelCooldown(guildId, channelId) {
  getGuildState(guildId).channelCooldowns.set(channelId, Date.now());
}

module.exports = {
  getGuildState,
  isActive,
  setActive,
  isChannelOnCooldown,
  markChannelCooldown,
};
