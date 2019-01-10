<template>
    <div class = "board-container" >
        <Modal v-if="IsNewUser">
            <h4 slot="header">
                PEACEOCEAN에 오신 걸 환영합니다. <br><br>
                PEACEOCEAN은 아래와 같이 이용하실 수 있습니다
            </h4>
            <i slot="icon" class="closeModalBtn fas fa-times fa-2x" @click="$store.state.IsNewUser = false"></i>
            <div slot="body">
                <b-img class = "exampleimg" src="https://i.postimg.cc/76xKdcZy/image2.png" fluid alt="예시 이미지"></b-img>
                <!-- 이미지 추가하기 -->
            </div>
        </Modal>
        <transition name="fade" mode="out-in" v-for="dashboard in checkDashBoard" :key="dashboard">
            <dash-board :dashboardId="dashboard.id" :reviews="dashboard.reviews">
                <span slot="name" class = "name">
                    <router-link :to="{ name : 'userpage' , params : { id : dashboard.userId }}">{{dashboard.user.nick}}</router-link>
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
                        <b-dropdown-item class = "likers-item" v-for="(nick, index) in dashboard.Liker" :key="index">
                            <router-link :to="{ name : 'userpage' , params : { id : dashboard.userId }}">{{nick.nick}}</router-link>
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

                <span slot="user-follow-btn" v-if="setUser.Followers.map(f=>f.id).includes($store.state.user.id)"
                    class = "follow-btn-true" @click="CancelFollow({id : dashboard.userId, name : dashboard.user.nick})">
                    <i class="fab fa-telegram-plane fa-2x"></i>
                </span>
                <span slot="user-follow-btn" v-else @click="SendFollow({id : dashboard.userId, name : dashboard.user.nick})">
                    <i class="fab fa-telegram-plane fa-2x"></i>
                </span>
                
                <span slot="follow-btn" v-if="setUser.Followings.map(f=>f.id).includes(dashboard.userId)"
                    class = "follow-btn-true" @click="CancelFollow({id : dashboard.userId, name : dashboard.user.nick})">
                    <i class="fab fa-telegram-plane fa-2x"></i>
                </span>
                <span slot="follow-btn" v-else @click="SendFollow({id : dashboard.userId, name : dashboard.user.nick})">
                    <i class="fab fa-telegram-plane fa-2x"></i>
                </span>

                <span slot="review-btn" v-if="ClickMoreReview === false" @click="ChangeReview">
                    <i class="fas fa-edit fa-2x"></i>
                </span>
                <span slot="review-btn-true" v-else @click="ChangeReview">
                    <i class="fas fa-edit fa-2x"></i>
                </span>  
            </dash-board>
        </transition>
    </div>
</template>

<script>
import DashBoard from '@/components/common/dashboardslot.vue';
import DashBoardMixin from '@/components/Mixin/dashboardmixin.js';
import filters from '@/components/Mixin/filters.js';
import Modal from '@/components/common/modal.vue';

export default {
    data(){
        return {
            showModal : true,
        }
    },
    computed : {
        IsNewUser(){
            return this.$store.state.IsNewUser
        }
    },
    mixins : [DashBoardMixin, filters],
    components : {
        DashBoard,
        Modal
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
    .main-image{
        height: 70%;
        width : 250px;
        overflow : hidden;
    }
    .image {
        width : 250px;
        height: 250px;
        object-fit: contain;
    }
    .image-2 {
        display : none;
    }
    /* ////////////////////////////////////////// */
    .like-content {
        color : rgb(66, 164, 244);
        font-size : 1rem;
    }
    .like-btn-true, .follow-btn-true , .review-btn-true{
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
    .closeModalBtn {
        color : rgb(66, 164, 244);
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .4s ease;
    }
    .fade-enter, .fade-leave-to
    /* .routing-fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    @media(max-width: 600px){
        .board-container {
            width : 95%;
        }
    }
</style>
