<template>
    <div class = "profile-container">
        <div class = "profile-img">
            <b-img class = "profile-img-default" rounded="circle" src="https://i.postimg.cc/yNc4Y0SW/image1.jpg" fluid alt="Responsive image" 
                                v-if="User.userImg === null " />
            <b-img class = "profile-img-change" rounded="circle" :src="User.userImg" fluid alt="이미지 손상" v-else />
        </div>
        <div class = "profile-content">
            <div class = "profile-header">
                <span class = "profile-header-title">
                    {{User.nick}} &nbsp; 님
                </span>
            </div>
            <div class = "profile-main">
                <div class = "board">
                    <span class = "board-text">게시글</span>
                    <!-- <span class = "board-num">{{$store.state.profiledashboard.length}}</span> -->
                </div>
                <div class = "followers">
                    <span class = "followers-text">팔로워</span>
                    <span class = "followers-num">{{User.Followers.length}}</span>
                    <b-dropdown class = "followers-name" variant = "link" no-caret>
                        <template slot="button-content">
                            <span><i class="fas fa-list-ul"></i></span>
                        </template>
                        <b-dropdown-item class = "followers-item" v-for="(nick1, index) in User.Followers" :key="index"
                                    v-if="nick1.length != 0">
                            {{nick1.nick}}
                        </b-dropdown-item>
                    </b-dropdown>
                </div>
                <div class = "followings">
                    <span class = "followings-text">팔로잉</span>   
                    <span class = "followings-num">{{User.Followings.length}}</span>
                    <b-dropdown class = "followings-name"  variant="link" no-caret>
                        <template slot="button-content">
                            <span><i class="fas fa-list-ul"></i></span>
                        </template>
                        <b-dropdown-item class = "followings-item" v-for="(nick2, index) in User.Followings" :key="index"
                                    v-if="nick2.length != 0">
                            {{nick2.nick}}
                        </b-dropdown-item>
                    </b-dropdown>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    created() {
        this.$store.dispatch('USERPROFILE_GET', {
            id : this.$route.params.id
        });
    },
    computed : {
        User() {
            return this.$store.getters.getUserProfile
        }
    },
}
</script>

<style scoped>
/* >>>>>>>>>>>>>>>>>>>>>>>> */
    .profile-container {
        display : flex;
        align-items: center;
        justify-content: center;
        margin-top : 100px;
    }
    .profile-img {
        width : 30%;
        margin-top : 40px;
        margin-right : 30px;
    }
    .profile-img-change {
        max-height: 60%;
        max-width : 80%;
    }
    .profile-header-change {
        padding : 0 0 10px 0;
    }
    .profile-content {
        width : 35%;
        padding : 20px;
    }
    .profile-header {
        text-align: left;
        margin-bottom : 40px;
    }
    .profile-header-title {
        font-size : 2rem;
        margin-right : 20px;
        margin-left : 20px;
    }
/* >>>>>>>>>>>>>>>>>>>>>>>> */

    .text-center {
        color : rgba(66, 164, 244, 0.8);
    }
    /* /////////////////////////////// */
    .closeModalBtn {
        color : rgb(66, 164, 244);
    }
    .change-nickname {
        margin-bottom : 20px;
    }
    .change-nickname-title, .change-image-title {
        margin-bottom : 20px;
    }
    .change-nickname-main, .change-image-main {
        display : flex;
    }
    .nickname-btn , .image-btn {
        color : white;
        background-color : rgba(66, 164, 244, 0.8);
        border : none;
    }
    .nickname-btn:hover,
    .nickname-btn:focus,
    .nickname-btn:visited, 
    .image-btn:hover,
    .image-btn:focus,
    .image-btn:visited {
        background-color: rgb(66, 164, 244);
    }
    /* //////////////////////////////// */
/* >>>>>>>>>>>>>>>>>>>>>>>> */
    .profile-main {
        display : flex;
        align-items: center;
        justify-content: center;
    }
    .board, .followers, .followings {
        width : 30%;
        margin-left : 5%;
        font-size : 1.3rem;
    }
    .followers, .followings {
        display : flex;
        align-items: center;
    }
/* >>>>>>>>>>>>>>>>>>>>>>>> */

    .board-num , .followers-num, .followings-num {
        margin-left : 15px;
        color : rgb(66, 164, 244);
    }
    .followers-name , .followings-name {
        display : inline-block;
    }
    .followings-item , .followers-item {
        color : rgb(66, 164, 244);
        font-size : 1rem;
    }
    /* ////////////////////// */
    .imagefile {
        display : inline-block;
        width : 50%;
    }
    .inputFile-btn{
        background-color: rgba(66, 164, 244, 0.8);
        color : white;
        border : 1px solid #ebebeb;
        padding : 10px;
        border-radius: 5px;
    }
    .inputFile-btn:hover ,
    .inputFile-btn:active {
        background-color: rgb(66, 164, 244);
    }
    .submit-section {
        text-align : right;
        display : inline-block;
        width : 50%;
    }
    .submitFile-btn{
        background-color: rgba(66, 164, 244, 0.8);
        color : white;
        border : 1px solid #ebebeb;
        padding : 10px;
        border-radius: 5px;
    }
    .submitFile-btn:hover ,
    .submitFile-btn:active {
        background-color: rgb(66, 164, 244);
    }
    img.preview {
        border: 1px solid silver;
        padding: 5px;
        display : block;
        margin : 0 auto;
    }
    .preview {
        max-width : 50%;
        max-height: 25%;
    }   
    /* ////////////////////// */
    @media (max-width : 1200px) {
        .profile-content {
            width : 50%;
        }
    }
    @media (max-width : 900px ) {
        .profile-container {
            width : 80%;
            display : block;
            margin : 0 auto;
            margin-top : 100px;
        }
        .profile-img {
            width : 50%;
            margin : 0 auto 30px auto;
        }
        .profile-content {
            width : 80%;
            margin : 0 auto;
            text-align : center;
        }
        .profile-img-change {
            max-height: 60%;
            max-width : 100%;
        }
        .profile-header {
            display : flex;
            align-items: center;
            justify-content: center;
            margin-bottom : 20px;
        }
        .profile-header-title {
            font-size : 1.7rem;
            margin-right : 15px;
        }
        .profile-main {
            display : block;
            width : 100%;
            padding : 20px;
        }
        .followers, .followings {
            display : block;
            margin-left : 5%;
        }
        .board, .followers, .followings {
            width : 100%;
            display : block;
            text-align: left;
            font-size : 1.3rem;
        }
        .board-num , .followers-num, .followings-num {
            margin-left : 15px;
            color : rgb(66, 164, 244);
        }
    }
    @media (max-width : 500px) {
        .profile-img {
            width : 80%;
        } 
        .profile-main {
            display : block;
            width : 100%;
            margin : 30px auto;    
            text-align: left;
        }
        .followers, .followings {
            margin-left : 0;
        }
        .board, .followers {
            margin-bottom : 5%; 
        }
        .board, .followers, .followings {
            font-size : 1.3rem;
        }
        .board-num , .followers-num, .followings-num {
            
            margin-left : 15px;
            color : rgb(66, 164, 244);
        }  
    }
</style>
