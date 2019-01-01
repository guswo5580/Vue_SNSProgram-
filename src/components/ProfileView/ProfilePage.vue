<template>
    <div>
        <Header></Header>
        <profile-main ></profile-main>
        <transition name="fade" mode="out-in">
            <profile-dashboard></profile-dashboard>
        </transition>  
        <back-to-top></back-to-top>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '../Header.vue';
import Footer from '../Footer.vue';
import BackToTop from '@/components/common/backtotop.vue';
import ProfileMain from './ProfileMain.vue';
import ProfileDashboard from './ProfileDashboard.vue';

export default {  
    components : {
        Header,
        Footer,
        BackToTop,
        ProfileMain,
        ProfileDashboard
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
