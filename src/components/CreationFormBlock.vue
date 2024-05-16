<template>
    <div class="block-container">
        <h3 class="block-title">{{ title }}</h3>
        <div class="block-container">
            <input
                class="block-input"
                type="text"
                v-if="input === 'full'"
                :value="value"
                @input="$emit('inputChange', $event.target.value)" />
            <div class="input-error" v-if="error !== '' && input === 'full'">{{ error }}</div>
        </div>
        <div class="block-container">
            <input
                class="block-input"
                type="text"
                v-if="input === 'short'"
                :value="value"
                @input="$emit('inputChange', $event.target.value)" />
            <span class="input-error" v-if="error !== '' && input === 'short'">{{ error }}</span>
        </div>
        <div class="block-container">
            <textarea
                class="block-input"
                v-if="input === 'textarea'"
                :value="value"
                @input="$emit('inputChange', $event.target.value)"></textarea>
            <span class="input-error" v-if="error !== '' && input === 'textarea'">{{ error }}</span>
        </div>
        <div class="block-container">
            <input
                type="file"
                accept="image/*"
                @change="addFile($event)"
                v-if="input === 'picture'" />
        </div>
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
        error: {
            type: String,
            required: false,
        },
    },
    methods: {
        addFile(event) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = () => {
                // const base64String = reader.result;
                // this.sendBase64ToServer(base64String);
            };

            reader.onerror = (error) => {
                console.error('Ошибка чтения файла:', error);
            };

            reader.readAsDataURL(file);
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

.input-error {
    color: red;
    text-align: initial;
}
</style>
