import conn from '../database/db'

const showDATABASES = async () => {
  const query = conn.execute(`SHOW DATABASES`)
  return query
}

export default { showDATABASES }
