import Vue from 'vue';
import Vuex from 'vuex';

import state from './modules/state.js';
import getters from './modules/getters.js';
import mutations from './modules/mutations.js';
import actions from './modules/actions.js';

Vue.use(Vuex);

export default new Vuex.Store({
    state, getters, mutations, actions
})
