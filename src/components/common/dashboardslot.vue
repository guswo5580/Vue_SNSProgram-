<template>
    <div class = "board-aligns" >
        <div class = "board-header">
            <slot name="name"></slot>
            <span class = "sub-name">
                님이 글을 게시했습니다.
            </span>
            <span class = "delete-btn">
                <slot name = "delete-btn"></slot>
            </span>
        </div>
        <div class = "board-main">
            <div class = "main-content">
                <slot name="content"></slot><br>
                <slot name="hashtag"></slot>
            </div>
            <div class = "main-image">
                <slot name="main-image"></slot>    
            </div>
        </div>
        <div class = "board-liker">
            <slot name = "like-count"></slot>
            <span class = "like-content">
                명이 좋아합니다
            </span>
            <slot name ="liker"></slot>
        </div>
        <div class = "button-section">
            <div class = "like-btn">
                <slot name="like-btn"></slot>
            </div>
            <div class = "follow-btn" v-if="$route.name === 'userpage'">
                <slot name="user-follow-btn"></slot>
            </div>
            <div class = "follow-btn" v-else>
                <slot name="follow-btn"></slot>
            </div>
            
            <div class = "review-btn">
                <slot name="review-btn"></slot>
            </div>
        </div>
        <div>
            <Review :dashboardId="dashboardId" :reviews="reviews" :hashtag="CheckHashtag"></Review>
        </div>
    </div>
</template>

<script>
import Review from './review/review.vue';
export default {
    props : ['dashboardId', 'reviews', 'hashtag'],
    computed : {
        CheckHashtag() {
            if( this.hashtag ){
                return this.hashtag
            } else {
                return null
            }
        }
    },
    components : {
        Review 
    },
}
</script>

<style>
    .board-aligns {
        display : inline-block;
        width : 40%;
        margin : 20px 2% 0 6%;
        border : 2px solid rgba(0, 0, 0, 0.1);
        vertical-align: top;
    }
    .board-header {
        border-bottom : 2px solid rgba(0, 0, 0, 0.1);
        padding : 10px;
    }
    
    /* //////////////////////////////////////// */
    .main-content {
        padding : 15px;
    }
    
    .main-image {
        padding : 20px;
        width : 80%;
        margin : 0 auto;
        text-align : center;
    }
    /* ////////////////////////////////////////// */
    .board-liker  {
        padding : 0 15px 10px 15px;
    }
    .like-content {
        font-size : 0.7rem;
    }

    /* ///////////////////////////////////////// */
    .button-section {
        display : flex;
        align-items: center;
        padding : 15px;
        justify-content: center;
        border-top : 2px solid rgba(0, 0, 0, 0.1);
    }
    .delete-btn {
        display: inline-block;
        text-align: right;
        color : rgba(66, 164, 244, 1);
    }
    .like-btn , .follow-btn , .review-btn {
        width : 33%;
        padding : 10px;
        text-align : center;
        color : rgba(66, 164, 244, 0.5);
    }
    .like-btn:hover, .follow-btn:hover , .review-btn:hover {
        background-color: rgba(0, 0, 0, 0.02);
        color : rgba(66, 164, 244, 1);
    }

    /* ///////////////////////////////////////// */
    
    @media (max-width : 850px) {
        .board-aligns {
            display : block;
            width : 70%;
            margin : 20px auto;
        }
    }
    @media (max-width : 600px) {
        .board-aligns {
            width : 100%;
        }
    }
</style>
