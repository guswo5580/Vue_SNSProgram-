<template>
    <div class = "board-container">
        <div class = "board-aligns" v-for="dashboard in $store.state.dashboard" :key="dashboard">
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
                    <b-img class = "image" :src="dashboard.img" fluid alt="이미지 로드 오류" v-if="checkImage(dashboard.img)"/>
                    <b-img class = "image-2"  fluid alt="Responsive image" v-else/>
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
    </div>
</template>

<script>
export default {
    created() {
        // this.$store.dispatch('RE_LOGIN');
        this.$store.dispatch('GET_DASHBOARD');
    },
    methods : {
        checkImage(img){
            if(img.naturalWidth === 0 )
                return false
            else 
                return true
        }
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
        width : 50%;
        margin-left : auto;
    }
    .main-image {
        padding : 20px;
        width : 80%;
        margin : 0 auto;
        text-align : center;
    }
    .image {
        max-width : 70%;
        max-height: 50%;
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
</style>
