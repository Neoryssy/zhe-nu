import NextAuth from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'

const handler = NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_ID!,
      clientSecret: process.env.DISCORD_SECRET!,
      authorization: {
        params: {
          scope: 'identify guilds guilds.members.read',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token = Object.assign({}, token, { access_token: account.access_token })
      }
      return token
    },
    async session({ session, token }) {
      if (session) {
        session = Object.assign({}, session, {
          access_token: token.access_token,
        })
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }
