<template>
    <div class = "profile-container">
        <div class = "profile-img">
            <b-img class = "profile-img-default" rounded="circle" src="https://i.postimg.cc/yNc4Y0SW/image1.jpg" fluid alt="Responsive image" 
                                v-if="$store.state.profile.userImg === null " />
            <b-img class = "profile-img-change" rounded="circle" :src="$store.state.profile.userImg" fluid alt="이미지 손상" v-else />
        </div>
        <div class = "profile-content">
            <div class = "profile-header">
                <span class = "profile-header-title">
                    {{UserNick}} &nbsp; 님
                </span>
                <span class = "profile-header-change">
                    <span class="text-center" @click="OpenModal">
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
                                <b-form-input v-model="nickname" type="text" placeholder="닉네임을 입력해주세요"
                                    @keyup.enter.native="ChangeNick"></b-form-input>
                                <b-button class = "nickname-btn" @click="ChangeNick">변경하기</b-button>
                            </div>
                        </div>
                        <div class = "change-image">
                            <div class = "change-image-title">
                                <h5>이미지 변경하기</h5>
                            </div>
                            <div class = "imagefile">
                                <label for="inputFile">
                                    <span class = "inputFile-btn">사진 업로드</span>
                                </label>
                                <input id="inputFile" type="file" @change="onFileSelected" accept="image/*" style="display : none;">
                            </div>
                            <div class = "submit-section">
                                <label for="submitbtn">
                                    <span class = "submitFile-btn" @click="ChangeImg">게시하기</span>
                                </label>
                                <b-button id = "submitbtn" style="display:none;"></b-button>
                            </div>
                            <div class="image-preview" >
                                <img class="preview" :src="$store.state.profile.userImg" v-if="$store.state.profile.userImg != null">
                                <img class="preview2"  v-else style="display:none">
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
import axios from 'axios';
import Modal from '@/components/common/modal.vue';

export default {
    created() {
        this.$store.dispatch('PROFILE_GET');
    },
    data() {
        return {
            showModal : false,
            nickname : null,
            selectedFile : null,
        }
    },
    computed : {
        UserNick(){
            return this.$store.state.profile.nick;
        }
    },
    methods : {
        OpenModal() {
            this.showModal = true;
        },
        ChangeNick() {
            this.$store.dispatch('CHANGE_NICK',{
                nick : this.nickname,
            });
            this.nickname = '';
            this.showModal = false;
            setTimeout( () => {
                this.$router.go(this.$router.currentRoute);
            }, 200);
        },
        onFileSelected(event) {
            this.selectedFile = event.target.files[0];
            const fd = new FormData();
            fd.append('img', this.selectedFile, this.selectedFile.name);
            axios.post('/post/img', fd)
                .then(response => {
                    if(response.status === 200){
                        console.log(response.data.url);
                        let url = response.data.url;
                        this.$store.state.profile.userImg = url;
                    }
                })
                .catch()
        },
        ChangeImg(){
            this.$store.dispatch('CHANGE_IMG', {
                url : this.$store.state.profile.userImg
            })
            this.showModal = false;
            setTimeout( () => {
                this.$router.go(this.$router.currentRoute);
            }, 200);
        }
    },
    components : {
        Modal
    }
}
</script>

<style scoped>
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
    .text-center {
        color : rgba(66, 164, 244, 0.8);
    }
    /* /////////////////////////////// */
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
</style>
