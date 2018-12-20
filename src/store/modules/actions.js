// import { LocalLogin } from '@/api/index.js';
import axios from 'axios';
import { router } from '@/routes/index.js';
import { bus } from '@/utils/bus.js';

export default {
    ///////////////////Login Logout Signup/////////////////////
    POST_LOGIN({commit}, data){
        bus.$emit('on:progress');
        axios.post('/auth/login', {
            email : data.email,
            password : data.password
        })
            .then(response => {
                commit('SET_USER', response.data);
                if(response.data.id) {
                    router.push( { name : 'home' });
                    bus.$emit('off:progress');
                }
                else {
                    alert('이메일과 비밀번호를 확인해주세요');
                }
                return response;
                
            })
            .catch()
    },
    POST_LOGOUT(){
        bus.$emit('on:progress');
        axios.get('/auth/logout')
            .then( () => {
                router.push( { name : 'login'});
                bus.$emit('off:progress');
            })
            .catch()
    },
    POST_JOIN({ dispatch }, data) {
        bus.$emit('on:progress');
        axios.post('/auth/join', {
            email : data.email,
            nick : data.nickname,
            password : data.password
        })
            .then(response => {
                if(response.data === "Completed") {
                    return dispatch('POST_LOGIN', {
                        email : data.email,
                        password : data.password
                    })
                }
                else 
                    alert("서버에 문제가 생겼습니다. 새로 고침 후 다시 시작해주세요");
                return response;
                
            })
            .catch()
    },

    //////////////////////Home///////////////////////////

    GET_DASHBOARD( { commit }){
        bus.$emit('on:progress');
        axios.get('/home/dashboard')
            .then( response => {
                commit('DASHBOARD', response.data.twits);
                commit('SET_USER', response.data.user);
                bus.$emit('off:progress');
            })
            .catch()
    },
    //인자에 data만 따로 선언해서 이용하면 안된다
    //commit이나 dispatch 혹은 context를 붙여서 이용해주자
    POST_CONTENT( {dispatch}, data ) {
        bus.$emit('on:progress');
        axios.post('/post', {
            content : data.content,
            url : data.url
        })
            .then( response => {
                if(response.data === 'No Content') {
                    alert('내용이 없습니다.');
                }else {
                    dispatch('GET_DASHBOARD');
                }    
            })
            .catch()
    },
    SEARCH_TAG( { commit }, data ){
        axios.get('/post/hashtag', {
            params : {
                hashtag : data.tag
            }
        })
            .then( response => {
                console.log(response.data);
                if(response.data === 'Failed') {
                    alert('검색한 태그가 없습니다.');
                }
                commit('SET_HASHTAG', response.data);
            })
            .catch()
    },

    //////////////////Profile//////////////////////
    PROFILE_GET ( { commit } ) {
        bus.$emit('on:progress');
        axios.get('/profile/information')
            .then( response => {
                commit('GET_PROFILE', response.data.user);
                // console.log(response.data.user);
                bus.$emit('off:progress');
            })
            .catch()
    },
    CHANGE_NICK( { dispatch }, data ) {
        axios.post('/profile/nickname', {
            nick : data.nick
        })
            .then( response => {
                if(response.data === 'Completed') {
                    dispatch('PROFILE_GET');
                }
            })
            .catch()
    },
    CHANGE_IMG( { dispatch }, data ) {
        axios.post('/profile/userImg', {
            url : data.url
        })
            .then( response => {
                if(response.data === 'Completed') {
                    dispatch('PROFILE_GET');
                }
            })
            .catch()
    }
}