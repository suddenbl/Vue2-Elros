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
            :error="nameError"
            @inputChange="updateData('fullName', $event)" />
        <CreationFormBlock
            :input="'short'"
            :title="'Краткое наименование'"
            :value="formData.shortName"
            :error="shortNameError"
            @inputChange="updateData('shortName', $event)" />
        <CreationFormBlock
            :input="'textarea'"
            :title="'Описание'"
            :value="formData.description"
            :error="descriptionError"
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
            nameError: '',
            shortNameError: '',
            descriptionError: '',
        };
    },
    created() {
        this.organizationStore = useOrganizationStore();
    },
    methods: {
        updateData(field, value) {
            this.formData[field] = value;
        },
        formValidate(fullName, shortName, description) {
            let isValid = false;

            this.nameError = '';
            this.shortNameError = '';
            this.descriptionError = '';

            if (fullName && shortName && description) {
                isValid = true;
            }

            if (!fullName) {
                this.nameError = 'Заполните полное наименование!';
                isValid = false;
            }

            if (!shortName) {
                this.shortNameError = 'Заполните краткое наименование!';
                isValid = false;
            }

            if (!description) {
                this.descriptionError = 'Заполните описание!';
                isValid = false;
            }

            return isValid;
        },
        createOrganization(name, short_name, description, is_active = true) {
            const isValid = this.formValidate(name, short_name, description);
            if (isValid) {
                this.organizationStore.createOrganization(name, short_name, description, is_active);
                this.$router.push('/');
            }
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
