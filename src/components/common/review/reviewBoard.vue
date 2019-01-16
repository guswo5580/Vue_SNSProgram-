<template>
    <div class = "review-board-container">
        <div class = "no-review-section" v-if="NoReview">
            <span class = "no-review">댓글이 없습니다</span>
        </div>
        <transition name="fade" mode="in-out" v-for="review in Reviews" :key="review">    
            <div class = "review_board" :class="{review_board_active : review.img}">
                <div class = "user-image">
                    <router-link :to="{ name : 'userpage' , params : { id : review.userId }} ">
                        <b-img class = "user-default" rounded src="https://i.postimg.cc/yNc4Y0SW/image1.jpg" fluid alt="Responsive image" 
                            v-if="review.userImg === null"/>
                        <b-img class = "user-change" rounded :src="review.userImg" fluid alt="이미지 손상" v-else /> 
                    </router-link>
                </div>
                
                <div class = "review-main">
                    <span class = "review-header">
                        <router-link :to="{ name : 'userpage' , params : { id : review.userId }}">{{review.userNick}}</router-link>
                    </span>
                    <span class = "review-content">
                        {{review.content}} <sub class = "sub-content">{{review.createdAt | SubContent}}</sub>
                    </span>
                    <span class = "review-img">
                        <b-img v-if="review.img === null" style="display:none;"></b-img>
                        <b-img v-else class = "review-content-img" rounded :src="review.img" fluid alt="이미지 손상"></b-img>
                    </span>
                </div>
            </div>
        </transition>        
    </div>
</template>

<script>
import Filters from '@/components/Mixin/filters.js';
export default {
    props : ['reviews', 'IndexNum','dashboardId'],
    mixins : [Filters],
    data() {
        return {
            none : false,
        }
    },
    computed : {
        ClickReviewBtn(){
            return this.$store.state.MoreReview
        },
        NoReview(){
            return this.none
        },
        Reviews(){
            if(this.reviews.length !== 0 ){
                this.none = false;
                if(this.$store.state.MoreReview.index === this.IndexNum && this.$store.state.MoreReview.click ){
                    this.none = false;
                    return this.reviews
                }
            }else { 
                this.none = true;
            }
        },
    },
}
</script>

<style scoped>
    .no-review-section {
        display : block;
        margin : 0 auto;
        text-align: center;
    }
    .no-review {
        font-size : 1.1rem;
        color : gray;
    }
    .review_board {
        display : flex;
        align-items : center;
        margin-bottom : 15px;
    }
    .review_board_active {
        display : block;
        margin-top : 20px;
    }
    .user-image {
        width : 40px;
        height : 40px;
        overflow : hidden;
        margin : 0 8px 0 0;
    }
    .user-default , .user-change {
        width : 40px;
        height: auto;
        object-fit: contain;
        vertical-align: middle;
    }
    .user-default , .user-change{
        width : auto;
        height: auto;
        object-fit: contain;
    }
    .review-main {
        padding : 5px;
        margin-left : 5px;
        background-color: rgba(0, 0, 0, 0.1);
        border-radius : 15px;
    }
    .review-header {
        font-size : 1.2em;
        color : rgb(66, 164, 244);
    }
    .review-content{
        font-size : 1.1rem;
    }
    .review-img {
        display : block;
        margin : 10px auto;
        width : 60%;
    }
    .review-content-img {
        max-height: 50%;
    }
    .sub-content {
        font-size : 0.7rem;
        color : gray;
        margin-left : 15px;
    }
    /* //////////////////////////////////// */
    .fade-enter-active, .fade-leave-active {
        transition: opacity .2s ease;
    }
    .fade-enter, .fade-leave-to
    /* .routing-fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    @media(max-width : 500px){
        .user-image{
            display: none;
        }
        .review-img{
            width : 70%;
        }
    }
    .review-img {
        display : block;
        margin : 5px auto;
        width : 60%;
    }
    .review-content-img {
        max-height: 50%;
    }
    /* //////////////////////////////////// */
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s ease;
    }
    .fade-enter, .fade-leave-to
    /* .routing-fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

    @media(max-width : 500px){
        .review-img{
            width : 70%;
        }
    }
</style>
