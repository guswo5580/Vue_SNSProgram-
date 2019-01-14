<template>
    <div class = "exampleView">
        <div class = "example-header">
            <p>
                PEACEOCEAN에 오신 걸 환영합니다. <br><br>
                PEACEOCEAN은 아래와 같이 이용하실 수 있습니다
            </p>                
        </div>
        
        <div class = "example-image">
            <div class = "example-section">
                <div class = "example-text">
                    게시글은 이렇게 이용할 수 있습니다
                </div>
                <div class = "image">
                    <b-img src="https://i.postimg.cc/76xKdcZy/image2.png" rounded fluid alt="예시 이미지" />
                </div>
            </div>
            <div class = "example-section">
                <div class = "example-text">
                    화면 상단에 이용할 수 있는 기능은 아래와 같습니다
                </div>
                <div class = "image">
                   <b-img src="https://i.postimg.cc/yYXXdfCL/image4.png" rounded fluid alt="예시 이미지" />
                </div>
            </div>
            <div class = "example-section">
                <div class = "example-text">
                    좋아요와 팔로우, 리뷰등의 기능을 이용할 수 있습니다
                </div>
                <div class = "image">
                    <b-img src="https://i.postimg.cc/prjCqx7v/image3.png" rounded fluid alt="예시 이미지"/>
                </div>
            </div>
            <div class = "example-section">
                <div class = "example-text">
                    프로필은 관리는 아래와 같이 이용할 수 있습니다
                </div>
                <div class = "image">
                    <b-img src="https://i.postimg.cc/R0qcg46Y/image5.png" rounded fluid alt="예시 이미지"/>
                </div>
            </div>
        </div>
        <label for="button" class = "btn-label" @keyup.enter.native="GotoHome">
            <span class = "gotohome-btn" @click="GotoHome">시작하기</span>
        </label>
        <input type="button" id="button" style="display:none;">
    </div>
</template>

<script>
export default {
    methods: {
        GotoHome(){
            this.$store.dispatch('POST_LOGIN', {
                email : this.$route.params.email,
                password : this.$route.params.password
            })
        }
    }
}
</script>

<style scoped>
    .example-header {
        font-weight: 900;
        font-size : 2rem;
        margin : 200px auto;
        width : 70%;
        display : block;
        color : rgba(66, 164, 244, 0.8);
    }
    .example-image {
        width : 60%;
        display : block;
        margin : 0 auto;
    }
    .example-text {
        font-size : 1.7rem;
        font-weight: bold;
        color : rgba(66, 164, 244, 0.8);
        margin-bottom : 30px;
    }
    .example-section {
        margin-bottom : 100px;
    }
    .btn-label {
        width : 25%;
        display : block;
        margin : 200px auto 200px auto;
        background-color: rgba(66, 164, 244, 0.6);   
        text-align: center;
        border-radius: 10px;
        border : none;
        padding : 10px;
        letter-spacing: 10px;
    }
    .gotohome-btn {
        /* background-color: rgba(66, 164, 244, 0.6); */
        text-align: center;
        border : none;
        color : white;
        font-size: 1.5rem;
        font-weight: bold;
        
    }
    .btn-label:hover, 
    .btn-label:active {
        background-color: rgb(66, 164, 244);
    }
    
    @media (max-width : 550px){
        .example-image {
            width : 75%;
        }
        .example-section {
            margin-bottom : 70px;
        }
        .btn-label {
            width : 50%;
        }
        .example-header {
            font-size : 1.6rem;
        }
        .example-text {
            font-size : 1.2rem;
        }
        .gotohome-btn {
            font-size : 1.2rem;
        }
    }
</style>
