import 'source-map-support/register'

import express from 'express'
import { connectionDB } from './src/db/db-setup'
import testRoutes from './src/routes/test-routes'
import boardRoutes from './src/routes/board-routes'

const app = express()
const port = 3000

app.use(express.json())

app.use(testRoutes())
app.use(boardRoutes())

app.listen(port, async () => {
  const connection = await connectionDB()
  await connection.connect().then(() => {
    console.log('db connection success!');
  })
  console.log(`wanted board app listening at http://localhost:${port}`)
})
