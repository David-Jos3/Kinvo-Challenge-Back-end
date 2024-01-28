import { RowDataPacket } from 'mysql2'
import conn from '../database/db'

const findTransactions = async (
  initDate: Date,
  endDate: Date,
  limit: number,
  offSet: number,
) => {
  const [filteredTransactions] = await conn.execute(
    'SELECT * FROM transactions WHERE date >= ? AND date <= ? LIMIT ? OFFSET ?',
    [initDate, endDate, `${limit}`, `${offSet}`],
  )

  const [allTransactions] = (await conn.execute(
    `SELECT * FROM transactions LIMIT ? OFFSET ? `,
    [`${limit}`, `${offSet}`],
  )) as RowDataPacket[]
  return { allTransactions, filteredTransactions }

  /*
   * Para o sql não me retornar o erro  'Incorrect arguments to to mysqld_stmt_execute' precisei
   * converter o meu 'limits' e 'offSet' em uma string
   */
}

const findUserById = async (userId: number) =>
  (
    await conn.execute('SELECT * FROM transactions WHERE user_id = ?', [userId])
  )[0]

const insertTransactions = async (
  userId: number,
  type: string,
  amount: number,
  date: string,
  description: string,
) => {
  ;(await conn.execute(
    'INSERT INTO transactions (user_id, type, amount, date, description) VALUES (?, ?, ?, ?, ?)',
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
  try {
    await conn.execute('DELETE FROM transactions WHERE user_id=?', [userId])
    await conn.execute('DELETE FROM users WHERE id=?', [userId])
  } catch (error) {
    console.error(error)
    throw error
  }
}

const getBalance = async (userId: number) => {
  const [rows] = (await conn.execute(
    'SELECT * FROM transactions WHERE user_id = ?',
    [userId],
  )) as RowDataPacket[]
  let balance = 0
  rows.forEach((transaction: { amount: number; type: string }) => {
    const amount = transaction.amount
    transaction.type.toLocaleLowerCase() === 'receita'
      ? (balance += amount)
      : (balance -= amount)
  })
  return { userId, amount: balance }
}
export default {
  insertTransactions,
  findTransactions,
  findUserById,
  update,
  deleteById,
  getBalance,
}
