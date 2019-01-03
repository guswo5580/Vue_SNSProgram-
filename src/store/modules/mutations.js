export default {
    SET_USER(state, data) {
        state.user = data;
    },
    GET_PROFILE(state, data ) {
        state.profile = data;
    },
    GET_USERPROFILE(state, data) {
        state.userprofile = data;
    },
    DASHBOARD(state, data) {
        state.dashboard = data;
    },
    PROFILE_DASHBOARD(state, data) {
        state.profiledashboard = data; 
    },
    SET_IMAGE(state, data) {
        state.postimage = data;
    },
    HASHTAG(state, data) {
        state.tagInfo = data;
        state.changeboard = true;
    },
    HASHTAG_DASHBOARD( state, data ){
        state.tagInfo = data;
        state.changeboard = true;
    },
    SEND_MESSAGE(state) {
        state.deletemessage = true;
    } 
}