import 'source-map-support/register'

import express from 'express'
import { sequelize } from './src/db/db-setup'
import { errorHandler, notFoundErrorHandler } from './src/utils/errorHandler'
import boardRoutes from './src/routes/board-routes'
import commentRoutes from './src/routes/comment-routes'

const PORT = 3000

async function server (app = express()) {
  app.use(express.json())

  app.use(boardRoutes())
  app.use(commentRoutes())

  app.use(notFoundErrorHandler)
  app.use(errorHandler)
  
  app.listen(PORT, () => {
    sequelize.authenticate()
      .then(() => {
        console.log('connection success')
      })
      .catch(err => {
        console.log('connection error. ', err)
      })
  })
  console.log(`express_board board app listening at http://localhost:${PORT}`)
}

server()