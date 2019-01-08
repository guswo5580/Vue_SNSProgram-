<template>
    <div class = "review-board-container">
        <div class = "review-board" v-for="review in Reviews" :key="review">
            <div class = "user-image">
                <b-img class = "user-default" rounded src="https://i.postimg.cc/yNc4Y0SW/image1.jpg" fluid alt="Responsive image" 
                    v-if="review.user.userImg === null"/>
                <b-img class = "user-change" rounded :src="review.user.userImg" fluid alt="이미지 손상" v-else /> 
                 
            </div>
            <div class = "review-main">
                <span class = "review-header">
                    <!-- <router-link :to="{ name : 'userpage' , params : { id : dashboard.userId }}">Rick</router-link> -->
                    {{review.user.nick}}
                </span>
                <span class = "review-content">
                   {{review.content}}  
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props : ['propsdata'],
    data(){
        return {
            reviews : [],
        }
    },
    created(){
        axios.get(`/review/${this.propsdata}`)
            .then( response => {
                console.log( response.data.reviews );
                this.reviews = response.data.reviews;
            })
    },
    computed : {
        Reviews() {
            return this.reviews
        }
    },
}
</script>

<style scoped>
    .review-board {
        display : flex;
        align-items : center;
    }
    .user-image {
        width : 11%;
        margin : 0 8px 0 0;
    }
    .user-default , .user-change{
        max-height: 100px;
    }
    .review-main {
        padding : 2px;
        background-color: #EEEEEF;
        border-radius: 10px;
    }
    .review-header {
        margin-left : 5px;
        color : blue;
    }
</style>
