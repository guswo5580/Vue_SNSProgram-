<template>
    <div class = "board-container" >
        <transition name="fade" mode="out-in" v-for="dashboard in $store.getters.getProfileDashboard" :key="dashboard">
            <dash-board>
                <span slot="name" class = "name">
                    {{dashboard.user.nick}}
                </span>
                <span slot="content" class = "content">
                    {{dashboard.content | removeHashtag}}
                </span>
                <span slot="hashtag" class = "hashtag">
                    {{dashboard.content | removeContent}}
                </span>
                <div slot="main-image">
                    <b-img class = "image-2"  fluid alt="Responsive image" v-if="dashboard.img === null"/>
                    <b-img class = "image" :src="dashboard.img" fluid alt="이미지 로드 오류" v-else/>
                </div>
                <span slot="like-content" class ="like-content" v-for="like in dashboard.Liker" :key="like">
                    {{like.nick}}
                </span>
                <div class = "button">
                    <span class = "delete-btn" 
                        v-if="$store.state.user.id === dashboard.userId">
                        <b-button @click="Delete(dashboard.id)">삭제하기</b-button>
                    </span>
                </div>
            </dash-board>    
        </transition>
    </div>
</template>

<script>
import DashBoard from '@/components/common/dashboard.vue';

export default {
    created() {
        this.$store.dispatch('GET_PROFILE_DASHBOARD');
    },
    methods : {
        Delete( data ){
            this.$store.dispatch('DELETE_DASHBOARD', {
                id : data
            });
        },
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
    },
    components : {
        DashBoard
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
    .name { 
        font-size : 1.2rem;
        color : rgb(66, 164, 244);
    }
    .sub-name {
        font-size : 1rem;
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
    }
    .image {
        max-height: 60%;
    }
    .image-2 {
        display : none;
    }
    /* ////////////////////////////////////////// */
    .like-content {
        color : rgb(66, 164, 244);
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
