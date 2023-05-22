const mysql = require('mysql');
const { promisify } = require('util')
const database = {
    host: "us-cdbr-east-04.cleardb.com",
    user: "b2d8be11ac0132",
    database: "heroku_9dd73d4785fd293",
    password: "8a947615",
}

const pool = mysql.createPool(database)


pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('la coneccion a base de datos fue cerrada')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('La base de datos tiene muchas conecciones')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('La coneccion fue rechazada')
        }
        if (err.message == 'Query was empty') {
            console.log('There is no changes in the update, lets continue the progress...');
            next();
        }
    }
    if (connection) {
        connection.release()
        console.log('DB is connected')
        return
    }
})

pool.query = promisify(pool.query)

module.exports = pool;