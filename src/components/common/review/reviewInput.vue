<template>
    <div class = "review-input">
        <div class = "user-image">
            <b-img class = "user-default" rounded src="https://i.postimg.cc/yNc4Y0SW/image1.jpg" fluid alt="Responsive image" 
                                v-if="$store.state.user.userImg === null "/>
            <b-img class = "user-change" rounded :src="$store.state.user.userImg" fluid alt="이미지 손상" v-else />
        </div>
        <div class = "user-input">
            <b-input-group>
                <b-form-input></b-form-input>
                <b-input-group-append>
                    <span class = "addbtn">
                        <b-btn class="btn btn-primary custom-btn"><i class="fas fa-plus fa-1.5x"></i></b-btn>
                    </span>
                    <span class = "imgbtn">
                        <b-btn class="btn btn-primary custom-btn"><i class="far fa-image fa-1.5x"></i></b-btn>
                    </span>
                </b-input-group-append>
            </b-input-group>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            text : null,
        }
    }
}
</script>

<style scoped>
    .review-input {
        display : flex;
        align-items: center;
        margin-bottom : 20px;
    }
    .user-image {
        width : 10%;
        margin : 0 5px 0 15px;
    }
    .user-input {
        width : 85%;
    }
    .user-default , .user-change {
        max-height : 70px;
    }
    /* ///////////////////b-button color change////////////////// */
    .btn-primary.custom-btn {
	    background-color: rgb(66, 164, 244);;
	    border : none;
        color : white;
    }
</style>
