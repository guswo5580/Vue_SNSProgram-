<template>
    <div class = "profile-container">
        <div class = "profile-img">
            <b-img class = "profile-img-change" rounded="circle" src="https://i.postimg.cc/yNc4Y0SW/image1.jpg" fluid alt="Responsive image" v-if="src != ''" />
            <b-img class = "profile-img-default" rounded="circle" src="https://i.postimg.cc/yNc4Y0SW/image2.jpg" fluid alt="Responsive image" v-else />
        </div>
        <div class = "profile-content">
            <div class = "profile-header">
                <span class = "profile-header-title">
                    {{$store.state.profile.nick}}
                </span>
                <span class = "profile-header-title">님</span>
                <span class = "profile-header-change">
                    <span class="text-center" @click="ChangeInfo">
                        <i class="fas fa-cogs fa-2x" v-b-tooltip.hover title="프로필 편집"></i>
                    </span>
                </span>
                <Modal v-if="showModal" @close="showModal = false">
                    <h4 slot="header">
                        아래의 항목을 선택해주세요  
                    </h4>
                    
                    <i slot="icon" class="closeModalBtn fas fa-times fa-2x" @click="showModal = false"></i>

                    <div slot="body">
                        <div class= "change-nickname">
                            <div class = "change-nickname-title">
                                <h5>닉네임 변경하기</h5>
                            </div>
                            <div class = "change-nickname-main">
                                <b-form-input v-model="nickname" type="text" placeholder="닉네임을 입력해주세요"></b-form-input>
                                <b-button class = "nickname-btn">변경하기</b-button>
                            </div>
                        </div>
                        <div class = "change-image">
                            <div class = "change-image-title">
                                <h5>이미지 변경하기</h5>
                            </div>
                            <div class = "change-image-main">
                                <b-form-file v-model="file" plain></b-form-file>
                                <b-button class = "image-btn">변경하기</b-button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
            <div class = "profile-main">
                <div class = "board">
                    <span class = "board-text">게시글</span>
                    <span class = "board-num">5</span>
                </div>
                <div class = "followers">
                    <span class = "followers-text">팔로워</span>
                    <span class = "followers-num">{{$store.state.profile.Followers.length}}</span>
                    <b-dropdown class = "followers-name" variant = "link" no-caret>
                        <template slot="button-content">
                            <span><i class="fas fa-list-ul"></i></span>
                        </template>
                        <b-dropdown-item class = "followers-item" v-for="(nick1, index) in $store.state.profile.Followers" :key="index"
                                    v-if="nick1.length != 0">
                            {{nick1.nick}}
                        </b-dropdown-item>
                    </b-dropdown>
                </div>
                <div class = "followings">
                    <span class = "followings-text">팔로잉</span>   
                    <span class = "followings-num">{{$store.state.profile.Followings.length}}</span>
                    <b-dropdown class = "followings-name"  variant="link" no-caret>
                        <template slot="button-content">
                            <span><i class="fas fa-list-ul"></i></span>
                        </template>
                        <b-dropdown-item class = "followings-item" v-for="(nick2, index) in $store.state.profile.Followings" :key="index"
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
import Modal from '@/components/common/modal.vue';

export default {
    created() {
        this.$store.dispatch('PROFILE_GET');
    },
    data() {
        return {
            showModal : false,
            nickname : null,
            file : null,
        }
    },
    methods : {
        ChangeInfo() {
            this.showModal = true;
        }
    },
    components : {
        Modal
    }
}
</script>

<style scoped>
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
    .profile-header {
        display : flex;
        align-items: center;
        justify-content: center;
    }
    .profile-header-title {
        font-size : 1.7rem;
        margin-right : 15px;
    }
    .text-center {
        color : rgba(66, 164, 244, 0.8);
    }
    /* ////////////////////////// */
    .change-nickname {
        margin-bottom : 20px;
    }
    .change-nickname-title, .change-image-title {
        font-size : 0.5rem;
        margin-bottom : 15px;
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
    /* /////////////////////////// */
    .profile-main {
        width : 100%;
        display : flex;
        align-items: center;
        justify-content: center;
        padding : 10px;
    }
    .followers, .followings {
        margin-left : 5%;
    }
    .board, .followers, .followings {
        font-size : 1.3rem;
    }
    .board-num , .followers-num, .followings-num {
        
        margin-left : 15px;
        color : rgb(66, 164, 244);
    }

    /* //////////////////////// */
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
