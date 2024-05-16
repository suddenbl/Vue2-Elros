import { defineStore } from 'pinia';
import axios from 'axios';

export const useOrganizationStore = defineStore('organizationStore', {
    state: () => ({
        loading: false,
        organizations: [],
        sortOrder: 'down',
        count: 0,
        next: null,
        previous: null,
    }),
    actions: {
        async getOrganizations(page = 1, page_size = 5) {
            try {
                this.loading = true;

                const response = await axios.get(
                    `https://developer3.elros.info/api/v1/organizations/?page=${page}&page_size=${page_size}`,
                );

                response.data.next === null ? (this.next = null) : (this.next = true);
                response.data.previous === null ? (this.previous = null) : (this.previous = true);

                this.count = response.data.count;
                this.organizations = response.data.results;
                this.loading = false;
            } catch (error) {
                console.log('Произошла ошибка при получении организации:', error);
            }
        },
        async sortOrganizations(param, page, page_size) {
            try {
                if (this.sortOrder === 'down') {
                    const response = await axios.get(
                        `https://developer3.elros.info/api/v1/organizations/?page=${page}&page_size=${page_size}&ordering=${param}`,
                    );
                    this.organizations = response.data.results;
                    this.sortOrder = 'up';
                } else {
                    const response = await axios.get(
                        `https://developer3.elros.info/api/v1/organizations/?page=${page}&page_size=${page_size}&ordering=-${param}`,
                    );
                    this.organizations = response.data.results;
                    this.sortOrder = 'down';
                }
            } catch (error) {
                console.log('Произошла ошибка при запросе сортировки', error);
            }
        },
        async deleteOrganization(id) {
            try {
                const response = await axios.delete(
                    `https://developer3.elros.info/api/v1/organizations/${id}/`,
                );
                console.log(response);
                if (response.status === 204) {
                    this.organizations = this.organizations.filter((el) => {
                        return el.id !== id;
                    });
                    console.log('Удаление организации прошло успешно!');
                }
            } catch (error) {
                console.log('Произошла ошибка при удалении организации: ', error);
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
    },
});
