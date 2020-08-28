const { getConnection } = require('../db/connection');
const Todo = {};

Todo.fetch = async () => {
    try {
        const conn = await getConnection()
        const todos = await conn.query('SELECT * FROM todo')
        return todos
    } catch (error) {
        console.log(error)
    }
}

Todo.insert = async (todo) => {
    try {
        const conn = await getConnection()
        await conn.query('INSERT INTO todo SET ?', todo)
        return 'success'
    } catch (error) {
        console.log(error)
        return 'something went wrong!'
    }
}

Todo.edit = async (todo) => {
    try {
        const conn = await getConnection()
        const result = await conn.query('UPDATE todo SET ? WHERE Id = ?', [
            todo,
            todo.id,
        ]);
        return 'success'
    } catch (error) {
        console.log(error)
        return 'something went wrong!'
    }
}

Todo.delete = async (id) => {
    try {
        const conn = await getConnection()
        await conn.query('DELETE FROM todo WHERE id = ?', id);
        return 'success'
    } catch (error) {
        console.log(error)
        return 'something went wrong!'
    }
}

module.exports = Todo