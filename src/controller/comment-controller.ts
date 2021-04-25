import _ from "lodash"
import { executeDB } from "../db/db-setup"

export async function fetchCommentListForBoard (boardId: number, limit: number, offset: number) {
  console.log('fetchCommentListForBoard(), boardId=', boardId, limit, offset)

  const sql = `
  SELECT id, upCommentId, writer, content, createAt, boardId
    FROM wanted.comment
   WHERE boardId = ${boardId}
   ORDER BY IFNULL(upCommentId, id) ASC, id ASC
   LIMIT ${offset}, ${limit}
  `
  return executeDB(sql)
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