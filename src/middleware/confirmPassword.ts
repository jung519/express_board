import { executeDB } from "../db/db-setup";
import { Board } from "../db/model/board";
import { CustomError } from "../utils/errorHandler";
import { validatePassword } from "../utils/utils";


export default async function confirmPassword (req: any, res: any, next: any) {
  const {id: boardId} = req.params
  const inputPassword = req.body.password

  const { password } = await Board.findByPk(boardId)
  
  if (!validatePassword(inputPassword, password)) {
    throw new CustomError('INVALID_PASSWORD', 'password invalid!', 401)
  }
  
  next();
}