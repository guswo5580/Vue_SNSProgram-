<template>
    <div class = "review-input-container">
        <div class = "review-input">
            <div class = "user-image">
                <b-img class = "user-default" rounded src="https://i.postimg.cc/yNc4Y0SW/image1.jpg" fluid alt="Responsive image" 
                                    v-if="$store.state.user.userImg === null "/>
                <b-img class = "user-change" rounded :src="$store.state.user.userImg" fluid alt="이미지 손상" v-else />
            </div>
            <div class = "user-input">
                <b-input-group>
                    <b-form-input v-model="text" placeholder="댓글을 입력하세요" @keyup.enter.native="SendReview"></b-form-input>
                    <b-input-group-append>
                        <span class = "addbtn" @click="SendReview">
                            <b-btn class="btn btn-primary custom-btn"><i class="fas fa-plus fa-1.5x"></i></b-btn>
                        </span>
                        <label for="inputFile">
                            <span class="btn btn-primary custom-btn"><i class="far fa-image fa-1.5x"></i></span>
                        </label>
                        <input id="inputFile" type="file" @change="onFileSelected" accept="image/*" multiple style="display : none;">
                    </b-input-group-append>
                </b-input-group>
            </div>        
        </div>
    </div>
    
</template>

<script>
import ImageMixin from '@/components/Mixin/image.js';
import axios from 'axios';
// import { bus } from '@/utils/bus.js';

export default {
    props : ['dashboardId', 'hashtag'],
    created(){
        console.log(this.hashtag);
    },
    mixins : [ImageMixin],
    data(){
        return{
            text : null,
        }
    },
    methods : {
        SendReview(){
            axios.post(`/review/${this.dashboardId}`, {
                content : this.text,
                url : this.$store.state.postimage,
            })
                .then( response => {
                    if(response.data === 'No content'){
                        alert('내용이 없습니다.');
                        router.push( {name : `${this.$router.history.current.name}`});
                    } else {
                        if(this.hashtag != null ){
                            this.$store.dispatch('RESET_TAG',{
                                tag : localStorage.getItem('tag'),
                            });
                        } else {
                            if( this.$route.name === 'home'){
                                this.$store.dispatch('GET_DASHBOARD');
                                this.count = 1;
                            } else if( this.$route.name === 'profile'){
                                this.$store.dispatch('GET_PROFILE_DASHBOARD');
                                this.count = 2;
                            } else {
                                this.$store.dispatch('GET_USER_DASHBOARD', {
                                    id : this.$route.params.id
                                });
                                this.count = 4;
                            }
                        }
                        // bus.$emit('get:reviews');
                    }
                })
                .catch()
            this.text = null;
            this.$store.state.postimage = null;
        }
    }
}
</script>

<style scoped>
    .review-input {
        display : flex;
        align-items: center;
        width : 100%;
        margin-bottom : 10px;
    }    
    .user-image {
        width : 40px;
        height : 40px;
        overflow : hidden;
        margin : 0 10px 0 0;
    }
    .user-change, .user-default {
        width : 40px;
        height: 40px;
        object-fit: contain;
        vertical-align: middle;
    }
    .user-input {
        width : 85%;
    }
    

    /* ///////////////////b-button color change////////////////// */
    .btn-primary.custom-btn {
	    background-color: rgb(66, 164, 244);;
	    border : none;
        color : white;
    }
</style>
