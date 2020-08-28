<template>
    <div>
        <header>
            <h1> To-do list app </h1>
        </header>

        <v-container>
            <v-layout wrap>
                <v-flex sm8 offset-sm-2>
                    <form @submit.prevent="addForm ? addTodo() : editTodo()">
                        <v-container fluid="">
                            <v-row>
                                <v-col cols="12" md="10" sm="10">
                                    <v-text-field
                                    v-model="description"
                                    label="Enter a task"
                                    color="info"
                                    filled
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" md="2" sm="2">
                                    <v-btn dark="" large="" class="pa-7" type="submit">
                                        {{ addForm ? 'submit' : 'edit'}}
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </form>
                </v-flex>
            </v-layout>

            <v-layout wrap>
                <v-flex sm8 offset-sm-2>
                    <v-simple-table fixed-header height="300px">
                        <thead>
                            <tr>
                                <th class="text-left">Id</th>
                                <th class="text-left">Description</th>
                                <th class="text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(todo, index) in todos" :key="index">
                                <td>{{ todo.id }}</td>
                                <td>{{ todo.description }}</td>
                                <td>
                                    <v-btn color="info" small="" class="mr-1" @click="setToEdit(index)"> Edit </v-btn>
                                    <v-btn color="secondary" small="" @click="completeTodo(todo.id)"> Complete </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </v-simple-table>
                </v-flex>
            </v-layout>
        </v-container>

    </div>
</template>

<script>
const { remote, ipcRenderer } = require("electron")

export default {
    data() {
        return {
            index: null,
            description: '',
            addForm: true,
            todos: []
        }
    },
    methods: {
        async fetchTodos() {
            ipcRenderer.send('fetch')
            ipcRenderer.on('allTodos', (event, arg)=>{
                this.todos = arg;
            })
        },

        async addTodo() {
            if(this.description !== '') {
                ipcRenderer.send('insert', { description: this.description});
                this.description = '';
                this.fetchTodos();
            } 
        },

        setToEdit(index) {
            this.addForm = false;
            this.index = index;
            this.description = this.todos[index].description;
        },

        editTodo() {
            this.addForm = true;
        
            let todo = {
                id: this.todos[this.index].id,
                description: this.description
            }

            ipcRenderer.send('edit', todo);
            this.description = '';
            this.fetchTodos();
        },
        
        completeTodo(id) {
            ipcRenderer.send('delete', id);
            this.fetchTodos();
        }
    },
    created() {
        this.fetchTodos();
    }
}
</script>

<style scoped>
header{
    background: rgb(51, 51, 51);
    color: rgb(143, 142, 142);
    padding: 20px;
    text-align: center;
}

</style>