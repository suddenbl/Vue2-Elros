<template>
    <form
        class="creation-form"
        @submit.prevent="
            createOrganization(formData.fullName, formData.shortName, formData.description)
        ">
        <CreationFormBlock
            :input="'full'"
            :title="'Полное наименование'"
            :value="formData.fullName"
            @inputChange="updateData('fullName', $event)" />
        <CreationFormBlock
            :input="'short'"
            :title="'Краткое наименование'"
            :value="formData.shortName"
            @inputChange="updateData('shortName', $event)" />
        <CreationFormBlock
            :input="'textarea'"
            :title="'Описание'"
            :value="formData.description"
            @inputChange="updateData('description', $event)" />
        <CreationFormBlock :input="'picture'" :title="'Картинка'" />
        <div class="creation-form-buttons">
            <router-link class="router-link" to="/">
                <TButton class="back-button" textLabel="Назад" />
            </router-link>
            <TButton textLabel="Создать" />
        </div>
    </form>
</template>

<script>
import CreationFormBlock from './CreationFormBlock.vue';
import TButton from './TButton.vue';
import { useOrganizationStore } from '@/store/organizationsStore';

export default {
    components: {
        CreationFormBlock,
        TButton,
    },
    data() {
        return {
            organizationStore: null,
            formData: {
                fullName: '',
                shortName: '',
                description: '',
            },
        };
    },
    created() {
        this.organizationStore = useOrganizationStore();
    },
    methods: {
        updateData(field, value) {
            this.formData[field] = value;
        },
        createOrganization(name, short_name, description, is_active = true) {
            console.log(this.formData);
            this.organizationStore.createOrganization(name, short_name, description, is_active);
        },
    },
};
</script>

<style lang="css" scoped>
.creation-form {
    display: flex;
    gap: 30px;
    flex-direction: column;
}

.creation-form-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}

.router-link {
    margin-bottom: 0;
    margin: 0;
}

.back-button {
    background-color: blue;
    outline: blue;
}

.back-button:hover {
    background-color: #0202bd;
    outline: #0202bd;
}
</style>
