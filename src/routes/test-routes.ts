import { Router } from 'express'
import { executeDB } from '../db/db-setup'

export default function testRoutes (router = Router()) {

  router.get('/test', getTest)

  async function getTest (req: any, res: any) {
    console.log('getTest')

    const result = await executeDB('select * from test')
    
    res.send({result})
  }
return router
}