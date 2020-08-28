const Todo = require('../models/todo');

const fetchTodos = async (event) => {
    try {
        const todos = await Todo.fetch();
        if(todos){
            event.sender.send('allTodos', todos);
        }
    } catch (error) {
        console.log(error);
    }
}

const insertTodo = async (event, todo) => {
    try {
        await Todo.insert(todo);
    } catch (error) {
        console.log(error);
    }
}

const editTodo = async (event, todo) => {
    try {
        await Todo.edit(todo);
    } catch (error) {
        console.log(error);
    }
}

const deleteTodo = async (event, id) => {
    try {
        await Todo.delete(id);
    } catch (error) {
        console.log(error);
    }
}
  
module.exports = {
    fetchTodos,
    insertTodo,
    editTodo,
    deleteTodo
}