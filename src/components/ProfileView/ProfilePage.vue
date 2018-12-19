<template>
    <div>
        <Header></Header>
        <profile-main></profile-main>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '../Header.vue';
import Footer from '../Footer.vue';
import ProfileMain from './ProfileMain.vue';

export default {
    components : {
        Header,
        Footer,
        ProfileMain
    }
}
</script>

<style>

</style>
