//Mixins dashboard

export default {
    data() {
        return {
            count : null,
        }
    },
    created() {
        
        if( this.$route.name === 'home'){
            this.$store.dispatch('GET_DASHBOARD');
            this.count = 1;
        } else if( this.$route.name === 'profile'){
            this.$store.dispatch('GET_PROFILE_DASHBOARD');
            this.count = 2;
        } else {
            this.$store.dispatch('GET_USER_DASHBOARD', {
                id : this.$route.params.id
            });
            this.count = 4;
        }
    },
    computed: {
        checkDashBoard(){
            if(this.$route.name === 'home') {
                return this.$store.getters.getDashboard
            } else if(this.$route.name === 'profile'){
                return this.$store.getters.getProfileDashboard
            } else {
                return this.$store.getters.getUserDashboard
            }
        },
        setUser(){
            if(this.$route.name === 'userpage'){
                return this.$store.getters.getUserProfile
            } else {
                return this.$store.getters.getUser
            }   
        }
    },
    
    methods : {
        Delete( data ){
            this.$store.dispatch('DELETE_DASHBOARD', {
                id : data,
                count : this.count
            });
        },
        sendLike( data ) {
            this.$store.dispatch('SEND_LIKE', {
                id : data.id,
                count : this.count,
                user : this.$route.params.id
                //dashboard 구분
            });
        },
        cancelLike( data ) {
            this.$store.dispatch('CANCEL_LIKE', {
                id : data.id,
                count : this.count,
                user : this.$route.params.id
                //dashboard 구분
            });
        },
        CancelFollow( data ) {
            this.$store.dispatch('CANCEL_FOLLOW', {
                id : data.id,
                name : data.name,
                count : this.count,
                user : this.$route.params.id
            })
        },
        SendFollow( data ) {
            this.$store.dispatch('SEND_FOLLOW', {
                id : data.id,
                name : data.name,
                count : this.count,
                user : this.$route.params.id
            })
        }
    },
}