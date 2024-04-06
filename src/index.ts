import config from './config'
import { close, connect } from './database'
import logger from './utils/logger'
import createServer from './utils/server'

export async function server(){

  let server: any
  let db: any
  const srvPort = config.server.port
  const dbPort = config.database.connection

  try {

    db = await connect()
    logger.info(`Database connected on ${dbPort}. `)

    server = createServer
    logger.info(`Server is listening on ${srvPort}. `)

  } catch (err:unknown) {

    process.exitCode = 1
    logger.fatal('FATAL ERROR WHILE STARTING SERVER!')

  } finally {

    if (!db){
      logger.fatal("Closing database...")
      await close()
      logger.fatal("Database closed")
    }

    if (!server){
      logger.fatal("Closing server...")
      process.on('Unhandled rejection', (err:unknown, promise) => {
        server.close(() => process.exit(1))
      })
      logger.fatal('Server closed')
    }

  }

}

server()
