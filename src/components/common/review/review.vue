<template>
    <div class = "review-container">
        <review-input class = "review-input" :dashboardId="dashboardId" :hashtag="hashtag"></review-input>
        <review-board class = "reviews" :reviews="reviews"></review-board>
    </div>
</template>

<script>
import ReviewInput from './reviewInput.vue';
import ReviewBoard from './reviewBoard.vue';
import { bus } from '@/utils/bus.js';
import axios from 'axios';

export default {
    props : ['dashboardId', 'reviews', 'hashtag'],

    components : {
        ReviewInput,
        ReviewBoard
    },
    created(){
        console.log(this.hashtag);
    }
}
</script>

<style scoped>
    .review-container {
        padding : 10px;
    }
    .review-input {
        margin-bottom : 20px;
    }
    .reviews {
        padding : 0 0 0 10px;
    }
</style>
