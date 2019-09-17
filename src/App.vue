<template>
<!-- comment 2 -->
	<div class="container">
        	<div class="row justify-content-center">
            	<div v-if="loaded" class="col-4">
                	<h3 class="my-3">ToDo List</h3>
                	<label class="mb-3">
                    	<input type="checkbox" v-model="showCompleted">
                    	Show completed items
                	</label>

                    <ToDoList v-bind:items="itemsVisible" v-on:remove="removeToDo($event)"/>

                    <NewItem v-on:new="addToDo($event)" />
            	</div>
            	<div v-else class="col-4 text-center">
                	<div class="spinner">
                    	<i class="fas fa-spinner fa-spin fa-7x"></i>
                    	Loading...
                	</div>
            	</div>
        	</div>
	</div>
</template>

<script>
// Comments

import ToDoList from './components/ToDoList.vue'
import NewItem from './components/NewItem.vue'
import axios from 'axios'
import _ from 'lodash';

export default {
    data () {
        return {
            loaded: false,
            showCompleted: false,
            items: [],
        }
    },
    computed: {
        itemsVisible () {
            var app = this
            return app.items.filter(function (item) {
                return app.showCompleted || !item.checked
            })
        }
    },
    components: {
        ToDoList,
        NewItem
    },
    created () {
        this.saveDebounced = _.debounce(this.saveToDo, 500)
        this.loadToDo()
    },
    methods: {
        addToDo(item) {
            if (this.items.length > 0) {
                item.id = _.maxBy(this.items, item => item.id).id + 1
            } else {
                item.id = 1;
            }
            this.items.push(item)
        },
        removeToDo(removeIndex) {
            this.items.splice(removeIndex, 1)
        },
        saveToDo() {
            console.log(this.items)
            axios.put('/rest/todo', this.items)
        },
        loadToDo() {
            var app = this
            axios.get('/rest/todo').then(function (response) {
                app.items = response.data;
                app.loaded = true
            })
        }
    },
    watch: {
        items: {
            handler (newItems, oldItems) {
                this.saveDebounced()
            },
            deep: true
        }
    },
}
</script>

<style scoped>
    .spinner {
        position: fixed;
        top: 50%;
        left: 50%;
        opacity: 0.5;
        margin: -56px 0 0 -56px;
        text-align: center;
        i {
            display: block;
            margin-bottom: 10px;
        }
    }
</style>