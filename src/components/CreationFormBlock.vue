<template>
    <div class="block-container">
        <h3 class="block-title">{{ title }}</h3>
        <input
            class="block-input"
            type="text"
            v-if="input === 'full'"
            :value="value"
            @input="$emit('inputChange', $event.target.value)" />
        <input
            class="block-input"
            type="text"
            v-if="input === 'short'"
            :value="value"
            @input="$emit('inputChange', $event.target.value)" />
        <textarea
            class="block-input"
            v-if="input === 'textarea'"
            :value="value"
            @input="$emit('inputChange', $event.target.value)"></textarea>
        <input type="file" v-if="input === 'picture'" />
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
        },
        input: {
            type: String,
            required: true,
        },
        value: {
            required: false,
        },
    },
};
</script>

<style lang="css" scoped>
.block-container {
    display: flex;
    flex-direction: column;
}

.block-title {
    display: inline;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 400;
    align-self: flex-start;
}

.block-input {
    border-radius: 5px;
    border: none;
    outline: none;
    font-size: 18px;
}
</style>
