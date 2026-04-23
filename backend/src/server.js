import app from './app.js'
import { env } from './config/env.js'
import sequelize from './db/sequelize.js'

await sequelize.authenticate()

const server = app.listen(env.PORT, () => {
  console.log(`API listening on http://localhost:${env.PORT}`)
})

// Função para desligamento gracioso
async function shutdown(signal) {
  console.log(`Received ${signal}. Desligando gracefully...`)

  server.close(async () => {
    await sequelize.close()
    console.log('Servidor HTTP desconectado.')
    process.exit(0)
  })
}

process.on('SIGINT', () => shutdown('SIGINT'))
process.on('SIGTERM', () => shutdown('SIGTERM'))
