<template>
    <div class = "review-container">
        <review-input class = "review-input"></review-input>
        <review-board class = "reviews"></review-board>
    </div>
</template>

<script>
import ReviewInput from './reviewInput.vue';
import ReviewBoard from './reviewBoard.vue';

export default {
    components : {
        ReviewInput,
        ReviewBoard
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
