const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: "localhost",
  database: 'login_dd',
  password: '1123',
  port: 5432,
})

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error(err)
    return
  }
  console.log('PostgreSQL login connected at:', res.rows[0].now)
})

module.exports = pool
