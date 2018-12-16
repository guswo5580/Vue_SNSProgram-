<template>
    <div class = "footer-container">
        <div class = "body-section">
            <ul class = "body">
                <li class = "body-title" v-for="item in this.items" :key="item">
                    {{item}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            items : [
                'peaceocean 정보' , '지원', '홍보 센터', 'API', '개인정보처리방침', '약관', '디렉터리' , '프로필', '해시태그', '© 2018 peaceocean'
            ]
        }
    }

}
</script>

<style scoped>
    .footer-container {
        margin-top : 50px;
        float : right;
        margin-right : 10%;
    }
    .body-section {
        margin-left : 40px;
    }
    .body {
        list-style: none;
        margin-top : 14px;
    }
    .body-title {
        display : inline; 
        font-size : 0.8rem;
        color : rgb(4, 4, 124);
        font-weight: 400;
        margin : 0 8px 0 8px;
    }
    /* /////////////////////////////// */
    @media (max-width : 700px) {
        .footer-container {
            margin-right : 0;
            text-align : center;
            margin-right : 12%;
        }
        .body {
            width : 80%;
            display : block;
            margin : 14px auto 10px auto;
        }
        .body-title {
            margin : 0 4px 0 4px;
        }
        .body-title:last-child{
            display : block;
            text-align : center;
        }
    }
    @media (max-width : 500px) {
        .footer-container {
            margin-right : 18%;
        }
        .body {
            width : 100%;
        }
    }
</style>
