<template>
    <div>
        <Header></Header>
        <profile-main v-if="this.window.width >= 900"></profile-main>
        <profile-main-res v-else></profile-main-res>
        <profile-dashboard></profile-dashboard>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '../Header.vue';
import Footer from '../Footer.vue';
import ProfileMain from './ProfileMain.vue';
import ProfileMainRes from './ProfileMainRes.vue';
import ProfileDashboard from './ProfileDashboard.vue';

export default {
    data() {
        return {
            window : {
                width : 0
            }
        }
    },  
    created() {
        window.addEventListener('resize', this.handleResize)
        this.handleResize();
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize)
    },
    methods: {
        handleResize() {
            this.window.width = window.innerWidth;
        }
    },
    components : {
        Header,
        Footer,
        ProfileMain,
        ProfileMainRes,
        ProfileDashboard
    }
}
</script>

<style>

</style>
