import express from 'express'
import testRoutes from './src/routes/test-routes'
import {connectionDB} from './src/db/db-setup'

const app = express()
const port = 3000

app.use(testRoutes())

app.listen(port, async () => {
  const connection = await connectionDB()
  await connection.connect().then(() => {
    console.log('db connection success!');
  })
  console.log(`wanted board app listening at http://localhost:${port}`)
})
