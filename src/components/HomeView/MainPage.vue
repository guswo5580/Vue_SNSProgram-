<template>
    <div>
        <Header></Header>
        <main-post></main-post>
        <main-board></main-board>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import MainPost from './MainPost.vue';
import MainBoard from './MainBoard.vue';

export default {
    components : {
        Header,
        Footer,
        MainPost,
        MainBoard
    },
    created() {
        history.pushState(null, null, location.href);
        window.onpopstate = function () {
            history.go(1);
        };
    }
}
</script>

<style>

</style>
