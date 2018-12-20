<template>
    <div class = "board-container">
        <transition name="fade" mode="out-in" v-for="dashboard in $store.getters.getDashboard" :key="dashboard">
            <div class = "board-aligns" >
                <div class = "board-header">
                    <span class = "name">
                        {{dashboard.user.nick}}
                    </span>
                    <span class = "sub-name">
                        님이 글을 게시했습니다.
                    </span>
                </div>
                <div class = "board-main">
                    <div class = "main-content">
                        <span class = "content">
                            {{dashboard.content | removeHashtag}} <br>
                        </span>
                        <span class = "hashtag">
                            {{dashboard.content | removeContent}}
                        </span>
                    </div>
                    <div class = "main-image">
                        <b-img class = "image-2"  fluid alt="Responsive image" v-if="dashboard.img === null"/>
                        <b-img class = "image" :src="dashboard.img" fluid alt="이미지 로드 오류" v-else/>
                        
                    </div>
                </div>
                <div class = "board-liker">
                    <span class = "like-title">
                        Like >>
                    </span>
                    <span class = "like-content" v-for="like in dashboard.Liker" :key="like">
                        {{like.nick}}
                    </span>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    created() {
        this.$store.dispatch('GET_DASHBOARD');
    },
    methods : {

    },
    filters : {
        removeHashtag(value) {
            let branch = value.indexOf('#');
            if(!value) return ''
            else {
                if( branch == -1){
                    return value
                }else {        
                    return value.substring(0, branch); 
                }
            }   
        },
        removeContent(value) {
            let branch = value.indexOf('#');
            if(!value) return ''
            else {
                if(branch == -1){
                    return ''
                }
                else {
                    return value.substring( branch , value.length );
                }
            }        
        }
    }
}
</script>

<style scoped>
    .board-container {
        display : block;
        width : 80%;
        margin : 0 auto;
        background-color : white;
        padding : 20px;
    }
    .board-aligns {
        display : inline-block;
        width : 40%;
        margin : 20px 2% 20px 4%;
        border : 2px solid rgba(0, 0, 0, 0.1);
        vertical-align: top;
    }
    .board-header {
        border-bottom : 2px solid rgba(0, 0, 0, 0.1);
        padding : 10px;
    }
    .name { 
        font-size : 1.2rem;
        color : rgb(66, 164, 244);
    }
    .sub-name {
        font-size : 1rem;
    }
    /* //////////////////////////////////////// */
    .main-content {
        padding : 15px;
    }
    .content {
        display : block;
        margin-bottom : 10px;
    }
    .hashtag {
        display : block;
        color : rgb(66, 164, 244);
        text-align: right;
        width : 100%;
        /* margin-left : auto; */
    }
    .main-image {
        padding : 20px;
        width : 80%;
        margin : 0 auto;
        text-align : center;
    }
    .image {
        max-height: 60%;
    }
    .image-2 {
        display : none;
    }
    /* ////////////////////////////////////////// */
    .board-liker  {
        padding : 0 15px 10px 15px;
    }
    .like-content {
        color : rgb(66, 164, 244);
    }

    /* ///////////////////////////////////////// */
    @media (max-width : 850px) {
        .board-aligns {
            display : block;
            width : 70%;
            margin : 20px auto;
        }
    }
    @media (max-width : 500px) {
        .board-aligns {
            width : 90%;
        }
    }

    /* ////////////////////////////////////// */
    .fade-enter-active, .fade-leave-active {
        transition: opacity .4s ease;
    }
    .fade-enter, .fade-leave-to
    /* .routing-fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>
