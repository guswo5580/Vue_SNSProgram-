//Mixins dashboard

export default {
    created() {
        let flag = this.$route.name === 'home' ? 'GET_DASHBOARD' : 'GET_PROFILE_DASHBOARD';
        this.$store.dispatch(flag);
    }
}