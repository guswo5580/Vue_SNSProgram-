<template>
    <div class = "login-container">
        <div class = "header">
            <div class = "logo">
                <router-link :to=" { name : 'login' } "><p class = "logo-name">PeaceOcean</p></router-link>
            </div>
        </div>
        <div class = "body">
            <div class = "form-group">
                <b-form-input v-model="email" type="text" placeholder="이메일을 입력하세요" autofocus></b-form-input>
            </div>
            <div class = "form-group">
                <b-form-group id="fieldset1" label-for="input2" :invalid-feedback="invalidFeedback"
                    :valid-feedback="validFeedback" :state="state">
                    <b-form-input id="input2" type ="password" :state="state" v-model="password" 
                            placeholder = "비밀번호를 입력하세요" @keyup.enter.native="Login">
                        </b-form-input>
                </b-form-group>
            </div>
            <div class = "form-button">
                <b-button class = "submit-button" @click="Login">로그인</b-button>
            </div>
        </div>
        <div class = "divide">
            <div class = "divide-line"><hr class = "line"></div>
            <div class = "divide-text">또는</div>
            <div class = "divide-line"><hr class = "line"></div>
        </div>
        <div class = "footer">
            <div class = "kakao">
                <b-button class = "kakao-button"><i class="fas fa-comment" style = "margin-right : 5px;"></i>
                    카카오톡으로 로그인</b-button>
            </div>
            <div class = "signup-section">
                <div class = "signup-title">
                    계정이 없으신가요?
                </div>
                <div class = "signup-button-section">
                    <router-link :to=" { name : 'join' } "><b-button class = "signup-button">가입하기</b-button></router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        state () {
            var pattern1 = /[0-9]/;	// 숫자 
            var pattern2 = /[a-zA-Z]/;	// 문자 
            var pattern3 = /[~!@#$%^&*()_+|<>?:{}]/;	// 특수문자
            if(!pattern1.test(this.password) || !pattern2.test(this.password) || !pattern3.test(this.password) || this.password.length < 8) { 
                return false; 
            } else {
                return true
            }

        },
        invalidFeedback () {
            var pattern1 = /[0-9]/;	// 숫자 
            var pattern2 = /[a-zA-Z]/;	// 문자 
            var pattern3 = /[~!@#$%^&*()_+|<>?:{}]/;	// 특수문자
            if(!pattern1.test(this.password) || !pattern2.test(this.password) || !pattern3.test(this.password) || this.password.length < 8) { 
                return '비밀번호를 입력해주세요'
            } else {
                return ''
            }
        },
        validFeedback () {
            return this.state === true ? '감사합니다' : ''
        }
    },
    methods : {
        Login(){
            this.$store.dispatch('POST_LOGIN',{
                email : this.email,
                password : this.password
            });
        }
    },
    data () {
        return {
            email : '',
            password : ''
        }
    }
}
</script>

<style scoped>
    .login-container {
        width : 30%;
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
        margin : 20px auto 20px auto;
    }
    .kakao-button {
        width : 100%;
        background-color : #fef01b;
        color : black;
        font-weight : bold;
    }
    .signup-section{
        display : flex;
        justify-content: center;
        align-items: center;
        margin-top : 20px;
    }
    .signup-title {
        margin-right : 20px;
    }
    .signup-button {
        background-color : rgba(66, 164, 244, 0.8);
        color : white;
    }
    .signup-button:hover{
        background-color : rgb(66, 164, 244);
    }
    /* ////////////////////////////////////////////////////// */
    @media (max-width : 700px) {
        .login-container {
            width : 70%;
        }
    }
    @media (max-width : 500px) {
        .login-container {
            width : 90%;
            background-color : transparent;
        }
    }
</style>
