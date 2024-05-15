<template>
    <button class="button">{{ textLabel }}</button>
</template>

<script>
export default {
    props: {
        textLabel: {
            type: String,
            required: true,
        },
    },
};
</script>

<style lang="css" scoped>
.button {
    width: 300px;
    padding: 10px;
    outline: 1px solid green;
    border-radius: 10px;
    cursor: pointer;
    align-self: center;
    background-color: green;
    transition: background-color 0.3s ease-in-out, outline 0.3s ease-in-out;
}
.button:hover {
    background-color: #21581e;
    outline: 1px solid #21581e;
}
</style>
