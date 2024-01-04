import { Server as NetServer } from 'http'
import { Server as ServerIO } from 'socket.io'

export const initializeServerIO = (httpServer: NetServer) => {
  const serverIO = new ServerIO(httpServer, {
    cors: {
      origin: 'http://localhost:8080',
    },
    path: '/api/socket/io',
    addTrailingSlash: false,
  })

  return serverIO
}
