<template>
    <transition-group appear name="list" tag="ul" class="list-group">
        <li class="list-group-item" v-bind:key="item.id" v-for="(item, index) in items">
            <button class="btn btn-link remove-btn" v-on:click="$emit('remove', index)">
                <i class="fas fa-times-circle"></i>
            </button>
            <label v-bind:for="'todo' + index">
                <input v-bind:id="'todo' + index" type="checkbox" v-model="item.checked" class="mr-2">
                <input class="todo-text" type="text" v-model="item.text">
            </label>
        </li>
    </transition-group>
</template>

<script>
export default {
    props: [ 'items' ]
}
</script>

<style scoped>
    .list-group-item {
        label {
            margin-bottom: 0;
        }
        .list-enter-active, .list-leave-active {
          transition: all 1s;
        }
        .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
          opacity: 0;
          transform: translateY(30px);
        }
        .todo-text {
            border: none;
        }
        .remove-btn {
            padding: 0;
            float: right;
            opacity: 0;
            transition: opacity 0.5s ease;
            height: 16px;
            border: none;
        }
        &:hover .remove-btn {
            opacity: 1;
        }
    }
</style>