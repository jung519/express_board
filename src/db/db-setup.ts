import * as mysql from 'mysql2/promise'

export async function connectionDB () {
  return mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'wjdgus123',
    port: 3306,
    database : 'wanted'
  })
}

export async function executeDB (sql: string, value?: Array<any>) {
  const getDb = await connectionDB()
  const [rows] = await getDb.execute(sql, value)
  return rows
}