<template>
    <div class = "board-container" >
        <transition name="fade" mode="out-in" v-for="dashboard in checkDashBoard" :key="dashboard">
            <dash-board>
                <span slot="name" class = "name">
                    {{dashboard.user.nick}}
                </span>
                <span slot="delete-btn" v-if="dashboard.userId === $store.state.user.id"
                    @click="Delete(dashboard.id)">
                    <i class="fas fa-trash-alt"></i>
                </span>
                <span slot="delete-btn" class = "delete-btn-false" v-else >
                    <i class="fas fa-trash-alt"></i>
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
                <span slot="like-count" class ="like-content" >
                    {{dashboard.Liker.length}}
                </span>
                <span slot="liker">
                    <b-dropdown class = "likers-name" variant = "link" no-caret>
                        <template slot="button-content">
                            <span><i class="fas fa-list-ul"></i></span>
                        </template>
                        <b-dropdown-item class = "likers-item" v-for="(nick, index) in dashboard.Liker" :key="index"
                                    v-if="nick.length != 0">
                            {{nick.nick}}
                        </b-dropdown-item>
                    </b-dropdown>
                </span>

                <span slot="like-btn" v-if="dashboard.Liker.map(l=>l.id).includes($store.state.user.id)"
                        class = "like-btn-true" @click="cancelLike({id : dashboard.id})">
                    <i class="fas fa-thumbs-up fa-2x"></i>
                </span>
                <span slot="like-btn" v-else @click="sendLike({id : dashboard.id})">
                    <i class="fas fa-thumbs-up fa-2x"></i>
                </span>
                
                <span slot="follow-btn">
                    <i class="fab fa-telegram-plane fa-2x"></i>
                </span>
                <span slot="review-btn">
                    <i class="fas fa-edit fa-2x"></i>
                </span>  
            </dash-board>        
        </transition>
    </div>
</template>

<script>
import DashBoard from '@/components/common/dashboard.vue';
import Mixin from '@/components/Mixin/mixin.js';

export default {
    mixins : [Mixin],
    computed : {
        checkDashBoard() {
            return this.$store.getters.getDashboard
        }
    },
    // created() {
    //     this.$store.dispatch('GET_DASHBOARD');
    //     console.log(this.$route.name);
    // },
    methods : {
        Delete( data ){
            this.$store.dispatch('DELETE_DASHBOARD', {
                id : data,
                count : 1,
            });
        },
        sendLike( data ) {
            this.$store.dispatch('SEND_LIKE', {
                id : data.id,
                count : 1,
                //dashboard 구분
            });
        },
        cancelLike( data ) {
            this.$store.dispatch('CANCEL_LIKE', {
                id : data.id,
                count : 1,
                //dashboard 구분
            });
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
        font-size : 1rem;
    }
    .like-btn-true {
        color : rgba(66, 164, 244, 1);
    }
    .delete-btn-false { 
        color : gray;
    }

    .likers-item {
        color : rgb(66, 164, 244);
        font-size : 0.8rem;
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
