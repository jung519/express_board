import _ from "lodash"
import { executeDB } from "../db/db-setup"
import { encrypt } from "../utils/utils"

export async function fetchBoardList (searchInfo: {searchText: string, limit: number, offset: number}) {
  console.log('fetchBoardList(), searchInfo=', searchInfo)
  const { searchText, limit, offset } = searchInfo

  const sql = ''
  return executeDB(sql, [searchText, limit, offset])
}

export async function fetchBoard (boardId: number) {
  console.log('fetchBoard(), boardId=', boardId)

  const sql = ''
  return executeDB(sql, [boardId])
}

export async function createBoard (boardInfo: {
  writer: string,
  password: string,
  title: string,
  content: string,
}) {
  console.log('createBoard(), boardInfo=', boardInfo)
  const { writer, password, title, content } = boardInfo 
  const sql = ''
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
  let setSql = ' '
  _.forOwn(boardInfo, (value, key) => {
    valueArr.push(value)
    setSql += `${key} = ${value}`
  })

  const sql = ''
  await executeDB(sql, valueArr)
}
