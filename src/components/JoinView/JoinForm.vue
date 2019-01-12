<template>
    <div class = "join-container">
        <div class = "header">
            <div class = "logo">
                <router-link :to=" { name : 'login' } "><p class = "logo-name">PeaceOcean</p></router-link>
            </div>
        </div>
        <div class = "body">
            <div class = "form-group">
                <b-form-group id="fieldset2" label-for="input1" :invalid-feedback="invalidId" 
                    :valid-feedback="validId" :state="Id">
                    <b-form-input id="input1" :state="Id" v-model="email" type="email" placeholder="이메일을 입력하세요"></b-form-input>
                </b-form-group>
            </div>
            <div class = "form-group">
                <b-form-input v-model="nickname" type="text" placeholder="닉네임을 입력하세요"></b-form-input>
            </div>
            <div class = "form-group">
                <b-form-group id="fieldset1" label-for="input2" :invalid-feedback="invalidPassword"
                    :valid-feedback="validPassword" :state="Password">
                    <b-form-input id="input2" :state="Password" type="password" v-model="password" placeholder = "비밀번호를 입력하세요"
                        @keyup.enter.native="Join" ></b-form-input>
                </b-form-group>
            </div>
            <div class = "form-button">
                <b-button class = "submit-button" @click="Join">가입하기</b-button>
            </div>
        </div>
        <div class = "divide">
            <div class = "divide-line"><hr class = "line"></div>
            <div class = "divide-text">또는</div>
            <div class = "divide-line"><hr class = "line"></div>
        </div>
        <div class = "footer">
            <div class = "kakao">
                <a href="/auth/kakao">
                    <b-button class = "kakao-button"><i class="fas fa-comment" style = "margin-right : 5px;"></i>
                        카카오톡으로 로그인
                    </b-button>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import Password from '@/components/Mixin/password.js';

export default {
    mixins : [Password],
    methods : {
        Join(){
            if( !this.Id || !this.Password ) {
                alert('이메일과 비밀번호를 확인해주세요');
                this.$router.push( { name : 'join' });
            }else {
                    this.$store.dispatch('POST_JOIN',{
                    email : this.email,
                    nickname : this.nickname,
                    password : this.password
                });
            }
            
        },
    },
    data () {
        return {
            email : '',
            password : '',
            nickname : ''
        }
    }
}
</script>

<style scoped>
    .join-container {
        width : 40%;
        display : block;
        margin : 100px auto 0 auto;
        background-color : white;
    }
    .header {
        text-align: center;
        margin : 20px 0 40px 0;
    }
    .logo > a {
        text-decoration : none;
    }
    .logo-name {
        font-weight: 900;
        font-size : 3rem;
        color : black;
    }
    .logo-name:hover {
        color : rgba(66, 164, 244, 0.8);
    }
    /* /////////////////////////////// */
    .body {
        width : 70%;
        display : block;
        margin : 0 auto 30px auto;
    }
    .submit-button { 
        width : 100%;
        background-color : rgba(66, 164, 244, 0.8);
        color : white;
        font-size : 1.2rem;
        letter-spacing: 4px;
        font-weight: bold;
    }
    .submit-button:hover {
        background-color : rgb(66, 164, 244);
    }
    /* //////////////////////////////////// */
    .divide {
        display : flex;
        align-items : center;
        justify-content: center;
        margin : 0 auto 0 auto;
    }
    .divide-text {
        margin : 0 10px 0 10px;
    }
    .divide-line {
        width : 30%;
    }
    .line {
        border : 1px solid gray;
    }
    /* ////////////////////////////////////// */
    .footer {
        width : 70%;
        display : block;
        margin : 20px auto 0 auto;
    }
    .kakao-button {
        width : 100%;
        background-color : #fef01b;
        color : black;
        font-weight : bold;
        margin-bottom : 50px;
    }
    /* ////////////////////////////////////////////////////// */
    @media (max-width : 700px) {
        .join-container {
            width : 70%;
        }
    }
    @media (max-width : 500px) {
        .join-container {
            width : 90%;
            background-color : transparent;
        }
    }
</style>
