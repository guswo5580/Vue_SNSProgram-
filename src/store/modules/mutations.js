export default {
    SET_USER(state, data) {
        state.user = data;
    },
    GET_PROFILE(state, data ) {
        state.profile = data;
    },
    DASHBOARD(state, data) {
        state.dashboard = data;
    },
    SET_IMAGE(state, data) {
        state.postimage = data;
    },
    HASHTAG(state, data) {
        state.tagInfo = data;
        state.changeboard = true;
    },
}