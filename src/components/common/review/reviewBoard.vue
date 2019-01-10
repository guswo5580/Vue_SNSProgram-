<template>
    <div class = "review-board-container">
        <transition name="fade" mode="out-in" v-for="review in reviews" :key="review">
            <div class = "review_board" :class="{review_board_active : review.img}">
                <div class = "user-image">
                    <router-link :to="{ name : 'userpage' , params : { id : review.userId }}">
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
                        {{review.content}}  
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
export default {
    props : ['reviews'],

}
</script>

<style scoped>
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
    /* //////////////////////////////////// */
    .fade-enter-active, .fade-leave-active {
        transition: opacity .4s ease;
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
        transition: opacity .4s ease;
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
</style>
