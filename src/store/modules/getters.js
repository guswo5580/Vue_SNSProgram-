export default {
    getUser( state ){
        return state.user;
    },
    
    getDashboard( state ) {
        return state.dashboard;
    },
    getProfileDashboard ( state ){
        return state.profiledashboard;
    },
    getTagInfo( state ) {
        return state.tagInfo;
    },

    getUserProfile( state ) {
        return state.userprofile;
    },
    getUserDashboard( state ) {
        return state.userdashboard;
    }

}