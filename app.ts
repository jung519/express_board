import 'source-map-support/register'

import express from 'express'
import { connectionDB } from './src/db/db-setup'
import { errorHandler, notFoundErrorHandler } from './src/utils/errorHandler'
import boardRoutes from './src/routes/board-routes'
import commentRoutes from './src/routes/comment-routes'

const PORT = 3000

async function server (app = express()) {
  const connection = await connectionDB()
  await connection.connect()
  console.log('db connection success!');

  app.use(express.json())

  app.use(boardRoutes())
  app.use(commentRoutes())

  app.use(notFoundErrorHandler)
  app.use(errorHandler)
  
  app.listen(PORT)
  console.log(`wanted board app listening at http://localhost:${PORT}`)
}

server()