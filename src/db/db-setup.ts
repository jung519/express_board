import * as mysql from 'mysql2/promise'


let connection: mysql.Connection

export async function connectionDB () {
  connection = await mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'wjdgus123',
    port: 3306,
    database : 'wanted'
  })
  return connection
}

export async function executeDB (sql: string, value?: Array<any>) {
  const getDb = await connection
  
  const bindSql = getDb.format(sql, value)
  console.log('execute sql=', bindSql)
  
  const [rows] = await getDb.execute(bindSql)
  return rows
}