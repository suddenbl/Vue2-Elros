import { defineStore } from 'pinia';
import axios from 'axios';

export const useOrganizationStore = defineStore('organizationStore', {
    state: () => ({
        loading: false,
        organizations: [],
        sortOrder: 'down',
        fullName: '',
        shortName: '',
        description: '',
        is_active: true,
    }),
    actions: {
        async getOrganizations() {
            try {
                this.loading = true;
                const response = await axios.get(
                    'https://developer3.elros.info/api/v1/organizations/',
                );
                this.organizations = response.data.results;
                this.loading = false;
            } catch (error) {
                console.log('Произошла ошибка при получении организации:', error);
            }
        },
        async sortOrganizations(param) {
            try {
                if (this.sortOrder === 'down') {
                    const response = await axios.get(
                        `https://developer3.elros.info/api/v1/organizations/?ordering=${param}`,
                    );
                    this.organizations = response.data.results;
                    this.sortOrder = 'up';
                } else {
                    const response = await axios.get(
                        `https://developer3.elros.info/api/v1/organizations/?ordering=-${param}`,
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
