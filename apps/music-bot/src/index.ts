import dotenv from 'dotenv'
dotenv.config()
import { startBot } from './bot'

const main = async () => {
    const discordClient = await startBot()
}

main()