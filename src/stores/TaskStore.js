import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [],
        loading: false,
    }),
    getters: {
        favs() {
            return this.tasks.filter(t => t.isFav)
        },
        favCount() {
            return this.favs.length
        },
        //with arrow function, we cannot use 'this'
        totalCount: (state) => {
            return state.tasks.length
        }
    },
    actions: {
        async getTasks() {
            this.loading = true
            const response = await fetch('http://localhost:3000/tasks')
            const data = await response.json()
            this.tasks = data;
            this.loading = false
        },
        async addTask(task) {
            const response = await fetch('http://localhost:3000/tasks', {
                method: 'post',
                body: JSON.stringify(task),
                headers: {
                    "Content-Type": 'application/json'
                }
            })
            if (response.error) {
                console.log('Not happening')
            } else {
                this.tasks.push(task)
            }
        },
        async deleteTask(id) {
            const response = await fetch('http://localhost:3000/tasks/' + id, {
                method: 'DELETE',
            })

            if (response.error) {
                console.log('Not happening')
            } else {
                this.tasks = this.tasks.filter(t => t.id != id)
            }

        },
        async toggleFav(id) {
            const task = this.tasks.find(t => t.id == id)

            const response = await fetch('http://localhost:3000/tasks/' + id, {
                method: 'PATCH',
                body: JSON.stringify({ isFav: !task.isFav }),
                headers: {
                    "Content-Type": 'application/json'
                }
            })

            if (response.error) {
                console.log('Not happening')
            } else {
                task.isFav = !task.isFav
            }


        }
    }

})