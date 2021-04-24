import { executeDB } from "../db/db-setup";


export default async function confirmPassword (req: any, res: any, next: any) {
  const boardId = req.params.id
  const inputPassword = req.body.password

  const sql = `SELECT password FROM wented.board where id = ?`
  const board = await executeDB(sql, [boardId])

  if (board) {
    console.log('board => ', board);
  }
  next();
}