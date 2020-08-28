const mysql = require('promise-mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'electron-vue-db'
});

function getConnection(){
    return connection;
}

module.exports = { getConnection }