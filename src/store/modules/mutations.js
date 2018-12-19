export default {
    SET_USER(state, data) {
        state.user = data;
        // sessionStorage.setItem("id", data.email );
        // sessionStorage.setItem("password", data.password );
    },
    GET_PROFILE(state, data ) {
        state.profile = data;
    },
    DASHBOARD(state, data) {
        state.dashboard = data;
    },
    SET_IMAGE(state, data) {
        state.postimage = data;
    }
}