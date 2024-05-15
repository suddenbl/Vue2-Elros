<template>
    <div class="organization-row">
        <div class="id-col">{{ org.id }}</div>
        <div class="name-col">{{ org.name }}</div>
        <div class="active-col" v-if="org.is_active">
            <button class="active-toggle green">Да</button>
        </div>
        <div class="active-col red" v-else>
            <button class="active-toggle red">Нет</button>
        </div>
        <div class="delete-col">
            <button @click="deleteOrganization(org.id)">
                <img class="delete-col-img" src="../assets/images/delete.svg" alt="Delete" />
            </button>
        </div>
    </div>
</template>

<script>
import { useOrganizationStore } from '@/store/organizationsStore';

export default {
    props: {
        org: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            organizationStore: null,
        };
    },
    created() {
        this.organizationStore = useOrganizationStore();
    },
    methods: {
        deleteOrganization(id) {
            this.organizationStore.deleteOrganization(id);
        },
    },
};
</script>

<style lang="css" scoped>
.organization-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin-bottom: 30px;
}

.active-toggle {
    padding: 5px;
    border-radius: 10px;
}

.green {
    background-color: green;
}

.red {
    background-color: red;
}

.delete-col-img {
    width: 30px;
    height: 30px;
    /* transition: filter 0.3s ease-in-out; */
    cursor: pointer;
}

.delete-col-img:hover {
    filter: brightness(0) saturate(100%) invert(15%) sepia(80%) saturate(7498%) hue-rotate(360deg)
        brightness(117%) contrast(113%);
}
</style>
