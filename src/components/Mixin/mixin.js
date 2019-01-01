//Mixins dashboard

export default {
    data() {
        return {
            count : null,
        }
    },
    created() {
        let flag = this.$route.name === 'home' ? 'GET_DASHBOARD' : 'GET_PROFILE_DASHBOARD';
        this.$store.dispatch(flag);
        this.count = this.$route.name === 'home' ? 1 : 2;
    },
    computed: {
        checkDashBoard(){
            if(this.$route.name === 'home') {
                return this.$store.getters.getDashboard
            } else {
                return this.$store.getters.getProfileDashboard
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
                count : this.count
                //dashboard 구분
            });
        },
        cancelLike( data ) {
            this.$store.dispatch('CANCEL_LIKE', {
                id : data.id,
                count : this.count
                //dashboard 구분
            });
        }
    },
    filters : {
        removeHashtag(value) {
            let branch = value.indexOf('#');
            if(!value) return ''
            else {
                if( branch == -1){
                    return value
                }else {        
                    return value.substring(0, branch); 
                }
            }   
        },
        removeContent(value) {
            let branch = value.indexOf('#');
            if(!value) return ''
            else {
                if(branch == -1){
                    return ''
                }
                else {
                    return value.substring( branch , value.length );
                }
            }        
        }
    },
}