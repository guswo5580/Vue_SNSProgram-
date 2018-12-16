import axios from 'axios';

const api = {
    LocalLogin : '/auth/login',
    KakaoLogin : '/auth/kakao',   
};

function LocalLogin(){
    return axios.post(api.LocalLogin);
}

export {
    LocalLogin
}