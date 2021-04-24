import Joi from 'joi'
import * as bcrypt from 'bcryptjs'

export function validateInputData (obj: Object, schema: any) {
  const joiObj = Joi.object(schema)
  const {value, error} = joiObj.validate(obj)

  if (error) {
    console.warn('validation error=', error)
    throw new Error(error.message)
  }

  return value
}

const SALT_WORK_FACTOR = 10
export function encrypt (password: string) {
  const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR)
  return bcrypt.hashSync(password, salt)
}

export const validatePassword = (password: string, hashed: string) => {
  return bcrypt.compareSync(password, hashed)
}