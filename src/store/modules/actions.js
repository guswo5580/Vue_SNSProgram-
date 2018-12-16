// import { LocalLogin } from '@/api/index.js';
import axios from 'axios';
import { router } from '@/routes/index.js';

export default {
    POST_LOGIN({commit}, data){
        axios.post('/auth/login', {
            email : data.email,
            password : data.password
        })
            .then(response => {
                commit('SET_USER', response.data);
                if(response.data.id)
                    router.push( { name : 'home' });
                else 
                    alert('이메일과 비밀번호를 확인해주세요');

                return response;
                
            })
            .catch(error => {
                console.error(error);
            })
    },
    RE_LOGIN( { commit }) {
        axios.post('auth/login', {
            email : sessionStorage.getItem(sessionStorage.key(sessionStorage.length-2)),
            password : sessionStorage.getItem(sessionStorage.key(sessionStorage.length-1))
        })
            .then( response => {
                commit('RE_USER', response.data);
                if(response.data.id)
                    router.push( { name : 'home' } );
                else 
                    alert('서버에 문제가 생겼습니다 다시 접속해주세요');

                return response;
            })
            .catch()
    },
    POST_LOGOUT(){
        axios.get('/auth/logout')
            .then( response => {
                console.log(response);
                router.push( { name : 'login'});
            })
            .catch( errer => {
                console.error(error)
            })
    },
    POST_JOIN({ dispatch }, data) {
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
            .catch(error => {
                console.error(error);
            })
    },
    GET_DASHBOARD( { commit }){
        axios.get('/home')
            .then( response => {
                commit('DASHBOARD', response.data.twits);
                commit('SET_USER', response.data.user);
                // console.log(response.data.user);
            })
            .catch()
    }
}