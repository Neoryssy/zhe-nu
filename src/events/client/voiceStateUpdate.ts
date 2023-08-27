import { Events, VoiceState } from 'discord.js'
import CEvent from '../../structures/CEvent'

module.exports = new CEvent({
  name: Events.VoiceStateUpdate,
  executor: async (client, oldState: VoiceState, newState: VoiceState) => {
    const guildId = oldState.guild.id
    const dispatcher = client.subscription.get(guildId)

    if (oldState.member?.user.id !== client.user?.id || !dispatcher) {
      return
    }

    if (newState.channel === null) {
      dispatcher.destroy()
    }
  },
})
