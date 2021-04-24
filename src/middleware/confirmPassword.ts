import { executeDB } from "../db/db-setup";
import { validatePassword } from "../utils/utils";


export default async function confirmPassword (req: any, res: any, next: any) {
  const boardId = req.params.id
  const inputPassword = req.body.password

  const sql = `SELECT password FROM wanted.board where id = ?`
  const [{password}]:any = await executeDB(sql, [boardId])
  
  if (!validatePassword(inputPassword, password)) {
    throw new Error('password invalid!')
  }
  
  next();
}