<template>
    <div>
        <Header></Header>
        <user-main></user-main>
        <Dashboard></Dashboard>
        <back-to-top></back-to-top>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '../../Header.vue';
import Footer from '../../Footer.vue';
import BackToTop from '@/components/common/backtotop.vue';
import UserMain from './UserMain.vue';
import Dashboard from '@/components/common/dashboard.vue';

export default {  
    components : {
        Header,
        Footer,
        BackToTop,
        UserMain,
        Dashboard
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
