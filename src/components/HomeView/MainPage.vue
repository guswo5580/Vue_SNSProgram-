<template>
    <div>
        <Header></Header>
        <main-post></main-post>
        <transition name="fade" mode="out-in">
            <main-board v-if="$store.state.changeboard === false"></main-board>
            <search-tags v-else></search-tags>
        </transition>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import MainPost from './MainPost.vue';
import MainBoard from './MainBoard.vue';
import SearchTags from './SearchTags.vue';

export default {
    components : {
        Header,
        Footer,
        MainPost,
        MainBoard,
        SearchTags
    },
    created() {
        history.pushState(null, null, location.href);
        window.onpopstate = function () {
            history.go(1);
        };
    }
}
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .4s ease;
    }
    .fade-enter, .fade-leave-to
    /* .routing-fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>
