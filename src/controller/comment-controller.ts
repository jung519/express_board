import _ from "lodash"
import { executeDB } from "../db/db-setup"

export async function fetchCommentListForBoard (boardId: number, limit: number, offset: number) {
  console.log('fetchCommentListForBoard(), boardId=', boardId, limit, offset)
  const sql = `
  
  `
  const commentList = await executeDB(sql, [])
  return commentList
}

export async function createComment (commentInfo: {
  boardId: number,
  writer: string,
  content: string,
}) {
  console.log('createComment(), commentInfo=', commentInfo)
  const { boardId, writer, content } = commentInfo
  const sql = `
  
  `
  await executeDB(sql, [boardId, writer, content])
}