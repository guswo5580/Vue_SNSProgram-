//Mixins dashboard

export default {
    created() {
        let flag = this.$route.name === 'home' ? 'GET_DASHBOARD' : 'GET_PROFILE_DASHBOARD';
        this.$store.dispatch(flag);
    },
    computed: {
        checkDashBoard(){
            if(this.$route.name === 'home') {
                return this.$store.getters.getDashboard
            } else {
                return this.$store.getters.getProfileDashboard
            }
        }
    }
}