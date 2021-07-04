import _ from "lodash"
import { Comment } from "../db/model/comment"

export async function createComment (commentInfo: {
  boardId: number,
  writer: string,
  content: string,
}) {
  console.log('createComment(), commentInfo=', commentInfo)

  await Comment.create(commentInfo)
}