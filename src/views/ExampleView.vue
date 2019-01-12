<template>
    <div class = "exampleView">
        <div class = "example-header">
            <p>
                PEACEOCEAN에 오신 걸 환영합니다. <br><br>
                PEACEOCEAN은 아래와 같이 이용하실 수 있습니다
            </p>                
        </div>
        <div class = "example-image">
            <b-carousel id="carousel"
                    label-prev="prev"
                    label-next="next"
                    background="#ababab"
                    :interval="2000"
                    v-model="slide"
                    @sliding-start="onSlideStart"
                    @sliding-end="onSlideEnd">
                <b-carousel-slide img-src="https://i.postimg.cc/76xKdcZy/image2.png"></b-carousel-slide>
                <b-carousel-slide img-src="https://i.postimg.cc/yYXXdfCL/image4.png"></b-carousel-slide>
                <b-carousel-slide img-src="https://i.postimg.cc/prjCqx7v/image3.png"></b-carousel-slide>
                <b-carousel-slide img-src="https://i.postimg.cc/R0qcg46Y/image5.png"></b-carousel-slide>
            </b-carousel>
        </div>
        <!-- :label-prev="<i class='far fa-chevron-left fa-2x' style='vertical-align : middel; color:rgb(66, 164, 244);'></i>"
        :label-next="<i class='far fa-chevron-right fa-2x' style=' vertical-align : middel; color:rgb(66, 164, 244);'></i>" -->
        
        <div class = "button" @click="GotoHome">
            <b-btn class="btn btn-primary custom-btn">시작하기</b-btn>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            slide: 0,
            sliding: null
        }
    },
    methods: {
        onSlideStart (slide) {
            this.sliding = true
        },
        onSlideEnd (slide) {
            this.sliding = false
        },
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
    #carousel { 
        width : 60%;
        display : block;
        margin : 0 auto 200px auto;
    }
    .button {
        width : 25%;
        display : block;
        margin : 0 auto 200px auto;
        background-color: rgb(66, 164, 244);
        text-align: center;
    }
    .btn-primary.custom-btn {
	    background-color: rgb(66, 164, 244);
	    border : none;
        color : white; 
        font-size : 1.2rem;
        font-weight: bold;
        text-align: center;
    }
</style>
