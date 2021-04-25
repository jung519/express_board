import Joi from 'joi'
import * as bcrypt from 'bcryptjs'
import { CustomError } from './errorHandler'

export function validateInputData (inputObj: Object, schema: any) {
  const joiObj = Joi.object(schema)
  const {value, error} = joiObj.validate(inputObj)

  if (error) {
    console.warn('validation error=', error)
    throw new CustomError('INVALID_INPUT', 'invalid input', 400)
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
