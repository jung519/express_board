import Joi from 'joi'
import * as bcrypt from 'bcryptjs'
import { CustomError } from './errorHandler'

export function validateInputData (inputObj: Object, schema: any) {
  const joiObj = Joi.object(schema)
  const {value, error} = joiObj.validate(inputObj)

  if (error) {
    throw new CustomError('INVALID_INPUT', error.message, 400)
  }

  return value
}

const SALT_WORK_FACTOR = 10
export function encrypt (password: string) {
  const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR)
  return bcrypt.hashSync(password, salt)
}

export function validatePassword (password: string, hashed: string) {
  return bcrypt.compareSync(password, hashed)
}
