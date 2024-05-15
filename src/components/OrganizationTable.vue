<template>
    <div class="table-container">
        <p class="table-description">
            Доступна сортировка. Для этого действия нажмите на именования столбцов.
        </p>
        <div class="table-bar">
            <div class="col id-col">
                <p class="id-col-name" @click="sortOrganizations('id')">
                    ID
                    <img
                        :class="{
                            'id-col-img': true,
                            rotated: organizationStore.sortOrder === 'up',
                        }"
                        src="../assets/images/arrow.svg"
                        alt="arrow" />
                </p>
            </div>
            <div class="col name-col" @click="sortOrganizations('name')">Наименование</div>
            <div class="col active-col" @click="sortOrganizations('is_active')">Активен</div>
            <div class="col delete-col">Удаление</div>
        </div>
        <div class="table-content" v-if="organizationStore.loading === false">
            <OrganizationCard
                v-for="org of organizationStore.organizations"
                :key="org.id"
                :org="org" />
        </div>
        <div class="loading-content" v-else>Идет загрузка...</div>
    </div>
</template>

<script>
import { useOrganizationStore } from '../store/organizationsStore';
import OrganizationCard from './OrganizationCard';

export default {
    components: {
        OrganizationCard,
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
        getOrganizations() {
            this.organizationStore.getOrganizations();
        },
        sortOrganizations(param) {
            this.organizationStore.sortOrganizations(param);
        },
    },
};
</script>

<style lang="css" scoped>
.table-container {
    display: flex;
    flex-direction: column;
}

.table-description {
    margin-bottom: 60px;
    font-size: 20px;
}

.table-bar {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin-bottom: 30px;
    padding-bottom: 10px;
    border-bottom: 2px solid rgb(56, 54, 54);
}

.col {
    font-size: 20px;
    color: white;
}

.id-col-name,
.id-col,
.name-col {
    cursor: pointer;
    transition: color 0.3s ease-in-out;
}

.id-col-name:hover,
.id-col:hover,
.name-col:hover {
    color: green;
}

.id-col {
    display: flex;
    justify-content: center;
    gap: 10px;
}

.id-col-name {
    position: relative;
}

.id-col-img {
    position: absolute;
    top: -3px;
    left: 25px;
    width: 30px;
    height: 30px;
    transform: rotateX(180deg);
    transition: transform 0.3s ease-in-out, filter 0.3s ease-in-out;
    cursor: pointer;
}

.id-col-img:hover {
    filter: brightness(0) saturate(100%) invert(28%) sepia(88%) saturate(974%) hue-rotate(85deg)
        brightness(104%) contrast(108%);
}

.rotated {
    transform: rotateX(0deg);
}
</style>
