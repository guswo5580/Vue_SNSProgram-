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
        <div class="image-preview" >
            <img class="preview" :src="$store.state.postimage" v-if="$store.state.postimage != null">
            <img class="preview2"  v-else style="display:none">
        </div>
    </div>
    
</template>

<script>
import ImageMixin from '@/components/Mixin/image.js';

export default {
    mixins : [ImageMixin],
    props : ['propsdata'],
    data(){
        return{
            text : null,
        }
    },
    methods : {
        SendReview(){
            this.$store.dispatch('SEND_REVIEW', {
                content : this.text,
                url : this.$store.state.postimage,
                postId : this.propsdata,
            });
            this.text = null;
        }
    }
}
</script>

<style scoped>
    .review-input {
        display : flex;
        align-items: center;
        width : 100%;
    }
    .user-image {
        width : 10%;
        margin : 0 10px 0 0;
    }
    .user-input {
        width : 85%;
    }
    .user-default {
        max-height: 100px;
    }
    .user-change {
        max-height : 70px;
    }
    /* ///////////////////b-button color change////////////////// */
    .btn-primary.custom-btn {
	    background-color: rgb(66, 164, 244);;
	    border : none;
        color : white;
    }
    img.preview {
        border: 1px solid silver;
        padding: 5px;
        display : block;
        margin : 0 auto;
    }
    .preview {
        max-width : 30%;
        max-height: 20%;
    }
</style>
