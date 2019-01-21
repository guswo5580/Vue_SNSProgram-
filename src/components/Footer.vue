<template>
    <div class = "footer-container">
        <div class = "body-section">
            <ul class = "body">
                <li class = "body-title" v-for="item in this.items" :key="item">
                    {{item}}
                </li>
            </ul>
        </div>
        <div class = "description-section">
            <span class = "description">이 사이트는 개인적인 용도로 만든 사이트입니다. 발전 방향에 대한 부분은 언제든지 이야기해주시고 건전하게 이용해주시기 바랍니다.</span>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            items : [
                'peaceocean 정보' , '조현재', 'guswo5580@naver.com', 'API', '약관', '디렉터리' , '프로필', '해시태그', '© 2018 peaceocean'
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
    .description-section {
        display: block;
        text-align: left;
    }
    .description {
        font-size: 0.8rem;
        color : rgb(4, 4, 124);
        font-weight: 400;
    }
    /* /////////////////////////////// */
    @media (max-width : 800px) {
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
        .description-section {
            text-align: center;
        }

    }
    @media (max-width : 600px) {
        .footer-container {
            margin-right : 18%;
        }
        .body {
            width : 100%;
        }
    }
</style>
