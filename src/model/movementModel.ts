import { RowDataPacket } from 'mysql2'
import conn from '../database/db'

const findTransactions = async () =>
  (await conn.execute('SELECT * FROM  transactions'))[0]

const findUserById = async (userId: number) =>
  (
    await conn.execute('SELECT * FROM transactions WHERE user_id = ?', [userId])
  )[0]

const insertTransactions = async (
  userId: number,
  type: string,
  amount: string,
  date: string,
  description: string,
) => {
  ;(await conn.execute(
    'INSERT INTO  transactions (user_id, type, amount, date, description) VALUES(?,?,?,?,?)',
    [userId, type, amount, date, description],
  )) as RowDataPacket[]
}

const update = async (
  userId: number,
  type: string,
  amount: number,
  date: string,
  description: string,
) => {
  if (type.toLocaleLowerCase() === 'receita') {
    ;(await conn.execute(
      'UPDATE transactions SET type=?, amount=?, date=?, description=? WHERE user_id=? AND type="receita"',
      [type, amount, date, description, userId],
    )) as RowDataPacket[]
  } else {
    ;(await conn.execute(
      'UPDATE transactions SET type=?, amount=?, date=?, description=? WHERE user_id=? AND type="despesa"',
      [type, amount, date, description, userId],
    )) as RowDataPacket[]
  }
}

const deleteById = async (userId: number) => {
  await conn.execute('DELETE FROM transactions WHERE user_id=?', [userId])
}
export default {
  insertTransactions,
  findTransactions,
  findUserById,
  update,
  deleteById,
}
