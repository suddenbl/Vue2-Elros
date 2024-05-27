import { defineStore } from 'pinia';
import axios from 'axios';

export const useOrganizationStore = defineStore('organizationStore', {
    state: () => ({
        loading: false,
        organizations: [],
        sortOrder: '-',
        sortName: '',
        pagesCount: 0,
        pageSize: 5,
        pageCurrent: 1,
        count: 0,
    }),
    actions: {
        setCount(count) {
            this.count = count;
            this.pagesCount = Math.ceil(count / this.pageSize);
        },
        setOrganizations(organizations) {
            this.organizations = organizations;
        },
        setPage(page) {
            this.pageCurrent = page;
        },
        setPageSize(size) {
            this.pageSize = size;
            this.pagesCount = Math.ceil(this.count / size);
            this.getOrganizations();
        },
        setSort(name) {
            this.sortName = name;

            if (this.sortOrder === '-') {
                this.sortOrder = '+';
            } else {
                this.sortOrder = '-';
            }
        },

        async getOrganizations() {
            try {
                const response = await axios.get(
                    `https://developer3.elros.info/api/v1/organizations/?page=${this.pageCurrent}&page_size=${this.pageSize}&ordering=${this.sortOrder}${this.sortName}`,
                );

                this.setCount(response.data.count);
                this.setOrganizations(response.data.results);

                console.log('Получение данных прошло успешно!', response);
            } catch (error) {
                console.log('Произошла ошибка при получении данных: ', error);
            }
        },
        async createOrganization(name, short_name, description, is_active) {
            try {
                const response = await axios.post(
                    'https://developer3.elros.info/api/v1/organizations/',
                    {
                        name,
                        short_name,
                        description,
                        is_active,
                    },
                );
                console.log('Добавление прошло успешно!', response);
            } catch (error) {
                console.log('Произошла ошибка при добавлении организациию: ', error);
            }
        },
        async deleteOrganization(id) {
            try {
                const response = await axios.delete(
                    `https://developer3.elros.info/api/v1/organizations/${id}`,
                );
                if (response.status === 204) {
                    this.organizations = this.organizations.filter((el) => {
                        return el.id !== id;
                    });
                    console.log('Удаление организации прошло успешно!');
                }
                console.log('Удаление прошло успешно!', response);
            } catch (error) {
                console.log('Произошла ошибка при удалении организации:', error);
            }
        },
    },
});
