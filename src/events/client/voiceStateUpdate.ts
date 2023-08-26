import { Events, VoiceState } from 'discord.js'
import CEvent from '../../structures/CEvent'
import Dispatcher from '../../structures/Dispatcher'

module.exports = new CEvent({
  name: Events.VoiceStateUpdate,
  executor: async (client, oldState: VoiceState, newState: VoiceState) => {
    const guildId = oldState.guild.id
    const dispatcher = client.subscription.get(guildId)

    if (!dispatcher) {
      return
    }

    if (newState.channel === null) {
      dispatcher.destroy()
    }
  },
})
