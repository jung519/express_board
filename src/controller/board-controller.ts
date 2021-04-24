import _ from "lodash"
import { executeDB } from "../db/db-setup"
import { encrypt } from "../utils/utils"

export async function fetchBoardList (searchInfo: {searchText: string, limit: number, offset: number}) {
  console.log('fetchBoardList(), searchInfo=', searchInfo)
  const { searchText, offset, limit } = searchInfo
  const valueArr: any[] = []

  let andSql = 'AND isDeleted = false '
  if (searchText) {
    andSql += `AND (writer LIKE ? OR title LIKE ?)`
    valueArr.push("%" + searchText + "%", "%" + searchText + "%")
  }

  const sql = `
  SELECT id, writer, title, content, createAt, updateAt
    FROM wanted.board
   WHERE 1=1
    ${andSql}
   ORDER BY ID DESC
   LIMIT ${offset}, ${limit}
  `

  return executeDB(sql, valueArr)
}

export async function fetchBoard (boardId: number) {
  console.log('fetchBoard(), boardId=', boardId)

  const sql = `
  SELECT id, writer, title, content, createAt, updateAt
    FROM wanted.board
   WHERE id = ${boardId}
  `
  const [board]: any = await executeDB(sql)
  return board
}

export async function createBoard (boardInfo: {
  writer: string,
  password: string,
  title: string,
  content: string,
}) {
  console.log('createBoard(), boardInfo=', boardInfo)
  const { writer, password, title, content } = boardInfo 
  
  const sql = `
  INSERT INTO wanted.board 
  (writer, password, title, content, createAt, updateAt)
  VALUES
  (?, ?, ?, ?, NOW(), NOW())
  `
  await executeDB(sql, [writer, encrypt(password), title, content])
}

export async function updateBoard (boardId: number, boardInfo: {
  writer?: string,
  title?: string,
  content?: string,
  isDeleted?: boolean,
}) {
  console.log('updateBoard(), boardId=', boardId, boardInfo)
  // const { writer, title, content, isDeleted } = boardInfo

  const valueArr: any[] = []
  let setSql = 'updateAt = NOW() '
  _.forOwn(boardInfo, (value, key) => {
    valueArr.push(value)
    setSql += `, ${key} = ?`
  })

  const sql = `
  UPDATE wanted.board
  SET ${setSql}
  WHERE id = ${boardId}
  `
  await executeDB(sql, valueArr)
}
