<template>
    <div>
        <h1 class="title">Создание организации</h1>
        <div class="creation-container">
            <CreationForm />
        </div>
    </div>
</template>

<script>
import CreationForm from '@/components/CreationForm.vue';

export default {
    components: {
        CreationForm,
    },
};
</script>

<style lang="css">
.creation-container {
    width: 70%;
    margin: 0 auto;
}
</style>
