<template>
    <div class = "review-container">
        <review-input class = "review-input" :propsdata="propsdata"></review-input>
        <review-board class = "reviews" :propsdata="reviews"></review-board>
    </div>
</template>

<script>
import ReviewInput from './reviewInput.vue';
import ReviewBoard from './reviewBoard.vue';
import { bus } from '@/utils/bus.js';
import axios from 'axios';

export default {
    props : ['propsdata'],
    data(){
        return{
            reviews : [],
        }
    },
    components : {
        ReviewInput,
        ReviewBoard
    },
    created(){
        this.GET_REVIEW();
        bus.$on('get:reviews', () => this.GET_REVIEW());
    },
    methods : {
        GET_REVIEW(){
            axios.get(`/review/post/${this.propsdata}`)
                .then( response => {
                    this.reviews = response.data.reviews;
                })
                .catch()
        },
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
