<template>
    <div class = "review-container">
        <review-input></review-input>
        <review-board></review-board>
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

<style>
    .review {
        padding : 20px;
    }
</style>
