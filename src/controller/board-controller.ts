import { Board, BoardAttributes } from "../db/model/board"
import { Comment } from "../db/model/comment"
import { encrypt } from "../utils/utils"

export async function fetchBoardList (limit: number, offset: number) {
  console.log('fetchBoardList(), limit=', limit, offset)

  return Board.findAll({
    where: { isDelete: false },
    limit,
    offset
  })
}

export async function fetchBoard (boardId: number) {
  console.log('fetchBoard(), boardId=', boardId)

  return Board.findOne({
    where: { id: boardId },
    include: { model: Comment },
    order: [[Comment, 'id', 'DESC']]
  })
}

export async function createBoard (boardInfo: BoardAttributes) {
  console.log('createBoard(), boardInfo=', boardInfo)
  const { password, ...board } = boardInfo 

  await Board.create({...board, password: encrypt(password) })
}

export async function updateBoard (boardId: number, boardInfo: BoardAttributes){
  console.log('updateBoard(), boardId=', boardId, boardInfo)

  await Board.update(boardInfo, {where: { id: boardId }})
}
