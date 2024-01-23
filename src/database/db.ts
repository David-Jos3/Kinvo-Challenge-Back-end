import mysql, { PoolOptions } from 'mysql2/promise'
import 'dotenv/config'

const access: PoolOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 10,
}

const conn = mysql.createPool(access)
export default conn
