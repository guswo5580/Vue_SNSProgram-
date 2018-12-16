<template>
    <div>
        <div id = "loginpage">
            <div class = "body-section">
                <login-image class = "login-image"></login-image>
                <login-form class = "login-form"></login-form>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Footer from '../Footer.vue';
import LoginForm from './LoginForm.vue';
import LoginImage from './LoginImage.vue';

export default {
    components : {
        Footer,
        LoginForm,
        LoginImage
    }
}
</script>

<style scoped>
    .body-section {
        margin-top : 100px;
        display : flex;
        justify-content: center;
        align-items : center;
    }
    .login-image {
        margin : 50px 20px 0 50px;
    }
    .login-form {
        margin-top : 40px;
    }
    /* /////////////////////////////////// */
    @media (max-width : 700px) {
        .login-image {
            display : none;
        }
    }
</style>
