import * as mysql from 'mysql2/promise'
import { Sequelize } from "sequelize"

export const sequelize = new Sequelize(
  'board', // db
  'root', // user
  'QmQ6syrpw8qw9JWnP3ynZ7RXZhurq4',  // password
  { host: 'localhost', dialect: 'mysql' }
)