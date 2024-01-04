import cors from 'cors'
import express from 'express'
import { createServer } from 'http'
import routes from '../server/routes'
import { initializeServerIO } from '../server/sockets'

const app = express()

app.use(express.json())
app.use(routes)

const httpServer = createServer(app)
const serverIO = initializeServerIO(httpServer)

export { httpServer, serverIO }
