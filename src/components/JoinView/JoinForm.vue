<template>
    <div class = "join-container">
        <div class = "header">
            <div class = "logo">
                <router-link :to=" { name : 'login' } "><p class = "logo-name">PeaceOcean</p></router-link>
            </div>
        </div>
        <div class = "body">
            <div class = "form-group">
                <b-form-input v-model="email" type="email" placeholder="이메일을 입력하세요"></b-form-input>
            </div>
            <div class = "form-group">
                <b-form-input v-model="nickname" type="text" placeholder="닉네임을 입력하세요"></b-form-input>
            </div>
            <div class = "form-group">
                <b-form-group id="fieldset1" label-for="input2" :invalid-feedback="invalidFeedback"
                    :valid-feedback="validFeedback" :state="state">
                    <b-form-input id="input2" :state="state" type="password" v-model="password" placeholder = "비밀번호를 입력하세요"></b-form-input>
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
                <b-button class = "kakao-button"><i class="fas fa-comment" style = "margin-right : 5px;"></i>
                    카카오톡으로 로그인</b-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        state () {
            return this.password.length >= 4 ? true : false
        },
        invalidFeedback () {
            if (this.password.length > 4) {
                return ''
            } else {
                return '4자 이상 입력해주세요'
            }
        },
        validFeedback () {
            return this.state === true ? '감사합니다' : ''
        }
    },
    methods : {
        Join(){
            this.$store.dispatch('POST_JOIN',{
                email : this.email,
                nickname : this.nickname,
                password : this.password
            });
        }
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
