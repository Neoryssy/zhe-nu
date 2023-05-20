import {
  ActionRowBuilder,
  ApplicationCommandOptionType,
  ComponentType,
  InteractionResponse,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from 'discord.js'
import { Command } from '../../structures/Command'
import Context from '../../structures/Context'
import DiscordMusicBot from '../../structures/DiscordMusicBot'

module.exports = new Command({
  name: 'search',
  description: 'Search music',
  slashCommand: {
    enabled: true,
    options: [
      {
        name: 'query',
        description: 'Search query',
        required: true,
        type: ApplicationCommandOptionType.String,
      },
    ],
  },
  async messageExecutor(client, ctx) {
    const query = ctx.args.join(' ')
    await search(client, ctx, query)
  },
  async interactionExecutor(client, ctx) {
    const query = ctx.args.join(' ')
    await search(client, ctx, query)
  },
})

const search = async (client: DiscordMusicBot, ctx: Context, query: string) => {
  let msg: InteractionResponse
  const res = await client.subsription.search(query)
  const row = new ActionRowBuilder()
  const select = new StringSelectMenuBuilder()

  if (!res) {
    ctx.sendMessage({
      content: 'Произошла ошибка во время поиска',
    })
  }
console.log(res)
  switch (res?.loadType) {
    case 'LOAD_FAILED': {
      ctx.sendMessage({
        content: 'Произошла ошибка во время поиска',
      })
      return
    }
    case 'NO_MATCHES': {
      ctx.sendMessage({
        content: 'Ничего не найдено',
      })
      return
    }
    case 'TRACK_LOADED':
    case 'SEARCH_RESULT': {
      const tracks = res.tracks.slice(0, 10)
      select
        .setCustomId('select-track')
        .setPlaceholder('Выберите трек')
        .addOptions(
          tracks.map((track, idx) => {
            const data = new StringSelectMenuOptionBuilder({
              label: track.info.title,
              value: idx.toString(),
            })
            return data
          })
        )
      row.addComponents(select)
      msg = await ctx.sendMessage({
        content: 'Выберите трек',
        components: [row],
      })
      break
    }
    default:
      return
  }

  const collector = msg.createMessageComponentCollector({
    componentType: ComponentType.StringSelect,
    max: 1,
    time: 60000,
  })

  collector.on('collect', async (i) => {
    const selection = Number(i.values[0])
    await ctx.editMessage(
      `${i.user} выбрал трек ${res.tracks[selection].info.title}`
    )
    await i.deferUpdate()
  })
  collector.on('end', async (_, reason) => {
    select.setDisabled(true)
    switch (reason) {
      case 'time':
        await ctx.editMessage({
          content: 'Истекло время выбора',
          components: [row],
        })
        break
      case 'limit':
        await ctx.editMessage({
          components: [row],
        })
        break
    }
  })
}
