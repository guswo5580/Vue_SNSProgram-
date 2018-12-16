export default {
    SET_USER(state, data) {
        state.user = data;
        sessionStorage.setItem("id", data.email );
        sessionStorage.setItem("password", data.password );
    },
    RE_USER(state, data) {
        if(state.user == [])
            state.user = data;
        else 
            return false
    },
    DASHBOARD(state, data) {
        state.dashboard = data;
    }
}