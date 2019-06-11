<template>
    <form class="row no-gutters my-2" v-on:submit.prevent="submit()">
        <div class="col">
            <input type="text" class="form-control" v-model="text">
        </div>
        <div class="col" style="flex-grow: 0;">
            <button class="btn btn-primary ml-2">
                Add
            </button>
        </div>
    </form>
</template>

<script>
export default {
    data: function () {
        return {
            text: ''
        }
    },
    methods: {
        submit() {
            this.$emit('new', { checked: false, text: this.text})
            this.text = '';
        },
    },
}
</script>