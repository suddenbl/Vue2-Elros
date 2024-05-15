<template>
    <div>
        <h1 class="title">Список организаций</h1>
        <router-link class="router-link" to="/CreateOrg">
            <TButton textLabel="+ Добавить организацию" />
        </router-link>
        <div class="main-table">
            <OrganizationTable />
        </div>
    </div>
</template>

<script>
import { useOrganizationStore } from '../store/organizationsStore';
import OrganizationTable from '../components/OrganizationTable.vue';
import TButton from '@/components/TButton.vue';

export default {
    components: {
        OrganizationTable,
        TButton,
    },
    data() {
        return {
            organizationsStore: null,
        };
    },
    mounted() {
        this.getOrganizations();
    },
    created() {
        this.organizationsStore = useOrganizationStore();
    },
    methods: {
        getOrganizations() {
            this.organizationsStore.getOrganizations();
        },
    },
};
</script>

<style lang="css">
.title {
    display: inline-block;
    margin-bottom: 50px;
}

.router-link {
    display: block;
    width: 300px;
    margin: 0 auto;
    margin-bottom: 50px;
}
</style>
