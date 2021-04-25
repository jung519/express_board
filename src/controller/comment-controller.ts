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
  upCommentId?: number
}) {
  console.log('createComment(), commentInfo=', commentInfo)
  const { boardId, writer, content, upCommentId } = commentInfo
  const sql = `
  INSERT INTO wanted.comment
  (boardId, writer, content, upCommentId, createAt)
  VALUES
  (?, ?, ?, ?, NOW())
  `
  await executeDB(sql, [boardId, writer, content, upCommentId])
}