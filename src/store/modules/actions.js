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
        // bus.$emit('on:progress');
        axios.get('/home/dashboard')
            .then( response => {
                commit('DASHBOARD', response.data.twits);
                commit('SET_USER', response.data.user);
                // bus.$emit('off:progress');
            })
            .catch()
    },
    GET_PROFILE_DASHBOARD( {commit }){
        axios.get('/profile/dashboard')
            .then( response => {
                commit('PROFILE_DASHBOARD', response.data.twits);
                commit('SET_USER', response.data.user);
            })
            .catch()
    },
    GET_USER_DASHBOARD( { commit }, data ){
        axios.get(`/profile/${data.id}/dashboard`)
            .then( response => {
                commit('USER_DASHBOARD', response.data.twits);
                commit('SET_USER', response.data.user);
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
                if(response.data === 'Failed') {
                    alert('검색한 태그가 없습니다.');
                    router.push( { name : `${this.$router.history.current.name}`});
                }
                commit('HASHTAG', response.data.twits);
            })
            .catch()
    },
    RESET_TAG( { commit }, data ){
        axios.get('/post/hashtag', {
            params : {
                hashtag : data.tag
            }
        })
            .then( response => {
                if(response.data === 'Failed'){
                    alert('검색한 태그가 없습니다.');
                }
                commit('HASHTAG_DASHBOARD', response.data.twits);
                commit('SET_USER', response.data.user);
            })
            .catch()
    },
    DELETE_DASHBOARD({commit, dispatch}, data) {
        alert("해당 게시글을 삭제하시겠습니까?");
        axios.delete('/post/delete', {
            params : {
                id : data.id
            }
        })
            .then( response => {
                if(response.data === 'OK' && data.count === 1){
                    alert('게시글이 삭제되었습니다.');
                    commit('SEND_MESSAGE');
                    dispatch('GET_DASHBOARD');

                } else if(response.data === 'OK' && data.count === 2){
                    alert('게시글이 삭제되었습니다.');
                    commit('SEND_MESSAGE');
                    dispatch('GET_PROFILE_DASHBOARD');

                } else if(response.data === 'OK' && data.count === 3){
                    alert('게시글이 삭제되었습니다.');
                    commit('SEND_MESSAGE');
                    dispatch('RESET_TAG' , {
                        tag : data.tag
                    });
                } else if(response.data === 'OK' && data.count === 4){
                    alert('게시글이 삭제되었습니다.');
                    commit('SEND_MESSAGE');
                    dispatch('GET_USER_DASHBOARD', {
                        id : data.user
                    })
                }
                else{
                    alert('서버에 문제가 생겼습니다. 잠시 후 다시 시도해주세요.');
                    location.reload();
                }
            })
            .catch()
    },
    //인자에 data만 따로 선언해서 이용하면 안된다
    //commit이나 dispatch 혹은 context를 붙여서 이용해주자
    POST_CONTENT( {dispatch}, data ) {
        // bus.$emit('on:progress');
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
    USERPROFILE_GET( { commit }, data ){
        axios.get(`/profile/${data.id}/information`)
            .then( response => {
                commit('GET_USERPROFILE', response.data.user);
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
    },

    ////////////////////Like & Follow/////////////////////////
    SEND_LIKE( { dispatch }, data ){
        axios.post(`/post/${data.id}/like`, {
            params : {
                id : data.id
            }
        })
            .then( response => {
                if(response.data === 'success' && data.count === 1) {
                    dispatch('GET_DASHBOARD');
                }else if( response.data === 'success' && data.count === 2){
                    dispatch('GET_PROFILE_DASHBOARD');
                }else if( response.data === 'success' && data.count === 3){
                    dispatch('RESET_TAG' , {
                        tag : data.tag
                    });
                }else if( response.data === 'success' && data.count === 4){
                    dispatch('GET_USER_DASHBOARD', {
                        id : data.user
                    })
                }
                else {
                    alert('원치않은 에러가 발생했습니다. 새로고침 후 다시 시도해 주세요');
                }
            })
            .catch()
    },
    CANCEL_LIKE( { dispatch }, data ){
        axios.post(`/post/${data.id}/unlike`, {
            params : {
                id : data.id
            }
        })
            .then( response => {
                if(response.data === 'success' && data.count === 1) {
                    dispatch('GET_DASHBOARD');
                }else if( response.data === 'success' && data.count === 2){
                    dispatch('GET_PROFILE_DASHBOARD');
                }else if( response.data === 'success' && data.count === 3){
                    dispatch('RESET_TAG' , {
                        tag : data.tag
                    });
                }else if( response.data === 'success' && data.count === 4){
                    dispatch('GET_USER_DASHBOARD', {
                        id : data.user
                    })
                }
                else {
                    alert('원치않은 에러가 발생했습니다. 새로고침 후 다시 시도해 주세요');
                }
            })
            .catch()
    },
    CANCEL_FOLLOW( { dispatch }, data ){
        alert(`${data.name} 님과 팔로잉을 끊으시겠습니까?`);
        if( data.count === 4 ){
            axios.post(`/profile/${data.id}/unfollow`, {
                params : data.id,
            })
                .then( response => {
                    if(response.data === 'success' && data.count === 1) {
                        dispatch('GET_DASHBOARD');
                    }else if( response.data === 'success' && data.count === 2){
                        dispatch('GET_PROFILE_DASHBOARD');
                    }else if( response.data === 'success' && data.count === 3){
                        dispatch('RESET_TAG' , {
                            tag : data.tag
                        });
                    }else if( response.data === 'success' && data.count === 4){
                        dispatch('GET_USER_DASHBOARD', {
                            id : data.user
                        });
                        dispatch('USERPROFILE_GET', {
                            id : data.user
                        });
    
                    }
                    else {
                        alert('원치않은 에러가 발생했습니다. 새로고침 후 다시 시도해 주세요');
                    }
                })
                .catch()
        } else {
            axios.post(`/user/${data.id}/unfollow`, {
                params : data.id,
            })
                .then( response => {
                    if(response.data === 'success' && data.count === 1) {
                        dispatch('GET_DASHBOARD');
                    }else if( response.data === 'success' && data.count === 2){
                        dispatch('GET_PROFILE_DASHBOARD');
                    }else if( response.data === 'success' && data.count === 3){
                        dispatch('RESET_TAG' , {
                            tag : data.tag
                        });
                    }else if( response.data === 'success' && data.count === 4){
                        dispatch('GET_USER_DASHBOARD', {
                            id : data.user
                        });
                        dispatch('USERPROFILE_GET', {
                            id : data.user
                        });
    
                    }
                    else {
                        alert('원치않은 에러가 발생했습니다. 새로고침 후 다시 시도해 주세요');
                    }
                })
                .catch()
        }
        
    },
    SEND_FOLLOW( { dispatch }, data ){
        alert(`${data.name} 님을 팔로우 하시겠습니까?`);
        if( data.count === 4 ){
            axios.post(`/profile/${data.id}/follow`, {
                params : data.id,
            })
                .then( response => {
                    if(response.data === 'success' && data.count === 1) {
                        dispatch('GET_DASHBOARD');
                    }else if( response.data === 'success' && data.count === 2){
                        dispatch('GET_PROFILE_DASHBOARD');
                    }else if( response.data === 'success' && data.count === 3){
                        dispatch('RESET_TAG' , {
                            tag : data.tag
                        });
                    }else if( response.data === 'success' && data.count === 4){
                        dispatch('GET_USER_DASHBOARD', {
                            id : data.user
                        });
                        dispatch('USERPROFILE_GET', {
                            id : data.user
                        });
                    }
                    else {
                        alert('원치않은 에러가 발생했습니다. 새로고침 후 다시 시도해 주세요');
                    }
                })
                .catch()
        } else {
            axios.post(`/user/${data.id}/follow`, {
                params : data.id,
            })
                .then( response => {
                    if(response.data === 'success' && data.count === 1) {
                        dispatch('GET_DASHBOARD');
                    }else if( response.data === 'success' && data.count === 2){
                        dispatch('GET_PROFILE_DASHBOARD');
                    }else if( response.data === 'success' && data.count === 3){
                        dispatch('RESET_TAG' , {
                            tag : data.tag
                        });
                    }else if( response.data === 'success' && data.count === 4){
                        dispatch('GET_USER_DASHBOARD', {
                            id : data.user
                        });
                        dispatch('USERPROFILE_GET', {
                            id : data.user
                        });
                    }
                    else {
                        alert('원치않은 에러가 발생했습니다. 새로고침 후 다시 시도해 주세요');
                    }
                })
                .catch()
        }   
    },

    ///////////////////////////////////////////////////////////////////

}