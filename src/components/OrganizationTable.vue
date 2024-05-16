<template>
    <div class="table-container">
        <h4 class="table-description">
            Доступна сортировка. Для этого действия нажмите на именования столбцов.
        </h4>
        <div class="table-bar">
            <div class="col id-col">
                <p class="id-col-name" @click="sortOrganizations('id', page, page_size)">
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
            <div class="col name-col" @click="sortOrganizations('name', page, page_size)">
                Наименование
            </div>
            <div class="col active-col" @click="sortOrganizations('is_active', page, page_size)">
                Активен
            </div>
            <div class="col delete-col">Удаление</div>
        </div>
        <div class="table-content" v-if="organizationStore.loading === false">
            <OrganizationCard
                v-for="org of organizationStore.organizations"
                :key="org.id"
                :org="org" />
        </div>
        <div class="loading-content" v-else>Идет загрузка...</div>
        <div class="pagination">
            <p>Количество на странице</p>
            <input
                class="pagination-size"
                type="number"
                min="1"
                :max="organizationStore.count"
                v-model="page_size"
                @change="getOrganizations(1, page_size)" />
            <p>
                {{ (page - 1) * page_size + 1 }} -
                {{ Math.min(page * page_size, organizationStore.count) }} из
                {{ organizationStore.count }}
            </p>
            <div class="pagination-buttons-block">
                <button class="pagination-button" @click="getOrganizationsFirst(page_size)">
                    {{ '|<' }}
                </button>
                <button class="pagination-button" @click="getOrganizationsPrev(page, page_size)">
                    {{ '<' }}
                </button>
                <button class="pagination-button" @click="getOrganizationsNext(page, page_size)">
                    {{ '>' }}
                </button>
                <button class="pagination-button" @click="getOrganizationsLast(page_size)">
                    {{ '>|' }}
                </button>
            </div>
        </div>
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
            page: 1,
            page_size: 5,
        };
    },
    created() {
        this.organizationStore = useOrganizationStore();
    },
    methods: {
        getOrganizations(page, page_size) {
            this.organizationStore.getOrganizations(page, page_size);
        },
        getOrganizationsFirst(page_size) {
            this.page = 1;
            this.getOrganizations(this.page, page_size);
        },
        getOrganizationsPrev(page, page_size) {
            if (this.organizationStore.previous === null) {
                return;
            } else {
                this.page = page - 1;
                this.getOrganizations(this.page, page_size);
            }
        },
        getOrganizationsNext(page, page_size) {
            if (this.organizationStore.next === null) {
                return;
            } else {
                this.page = page + 1;
                this.getOrganizations(this.page, page_size);
            }
        },
        getOrganizationsLast(page_size) {
            this.page = Math.ceil(this.organizationStore.count / page_size);
            this.getOrganizations(this.page, page_size);
        },
        sortOrganizations(param, page, page_size) {
            this.organizationStore.sortOrganizations(param, page, page_size);
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

.table-content {
    margin-bottom: 30px;
    border-bottom: 2px solid rgb(56, 54, 54);
}

.pagination {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 30px;
}

.pagination-quantity {
    border: 1px solid white;
    padding: 5px;
}

.pagination-buttons-block {
    display: flex;
    gap: 30px;
}

.pagination-button {
    cursor: pointer;
    transition: color 0.3s ease-in-out;
}

.pagination-button:hover {
    color: green;
}
</style>
