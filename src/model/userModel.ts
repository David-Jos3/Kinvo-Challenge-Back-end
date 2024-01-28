import conn from '../database/db'
import { RowDataPacket } from 'mysql2'

const createUserModel = async (
  username: string,
  passwordHash: string,
  email: string,
) => {
  ;(await conn.execute(
    'INSERT INTO users (username, password_hash , email) VALUES (?,?,?)',
    [username, passwordHash, email],
  )) as RowDataPacket[]
}

const loginUserModel = async (email: string) => {
  const [user] = (await conn.execute('SELECT * FROM users WHERE email = ?', [
    email,
  ])) as RowDataPacket[]

  return user.length > 0 ? user[0].password_hash : null
}

const updateRegisterModel = async (
  username: string,
  passwordHash: string,
  email: string,
  userId: number,
) => {
  await conn.execute(
    'UPDATE users SET username=?, password_hash=? ,email=? WHERE id=?',
    [username, passwordHash, email, userId],
  )
}

export default {
  createUserModel,
  loginUserModel,
  updateRegisterModel,
}
