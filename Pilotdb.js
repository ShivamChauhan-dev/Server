const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: "localhost",
  database: 'Admin',
  password: '1123',
  port: 5432,
})

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error(err)
    return
  }
  console.log('Pilot connected at:', res.rows[0].now)
})

module.exports = pool
