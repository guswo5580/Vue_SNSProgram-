<template>
    <div class = "review-board-container">
        <div class = "review-board">
            <div class = "user-image">
                <b-img class = "user-default" rounded src="https://i.postimg.cc/yNc4Y0SW/image1.jpg" fluid alt="Responsive image" 
                                    />
                <!-- <b-img class = "user-change" rounded :src="$store.state.user.userImg" fluid alt="이미지 손상" v-else /> 
                v-if="$store.state.user.userImg === null "-->
            </div>
            <div class = "review-main">
                <span class = "review-header">
                    <!-- <router-link :to="{ name : 'userpage' , params : { id : dashboard.userId }}">Rick</router-link> -->
                    Rick
                </span>
                <span class = "review-content">
                   content  
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {

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
