<template>
    <main>
        <div class="container">
            <router-view></router-view>
        </div>
    </main>
</template>

<script>
export default {
    name: 'App',
    metaInfo: {
        title: 'Vue-Elros',
        lang: 'ru',
    },
};
</script>

<style lang="css" scoped>
.container {
    margin: 40px;
    padding: 40px;
    text-align: center;
    background-color: #0d071c;
    border-radius: 10px;
}
</style>
