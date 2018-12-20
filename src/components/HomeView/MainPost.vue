<template>
    <div class = "mainform">
        <div class = "form-group">
            <b-form-textarea id="textarea1" v-model="content" placeholder="게시글을 작성해주세요"
                    :rows="3" :max-rows="6" @keyup.enter.native="Submit">
            </b-form-textarea>

            <div class="filebox"> 
                <div class="file-upload-form">
                    <div class = "imagefile">
                        <label for="inputFile">
                            <span class = "inputFile-btn">사진 업로드</span>
                        </label>
                        <input id="inputFile" type="file" @change="onFileSelected" accept="image/*" style="display : none;">
                    </div>
                    <div class = "submit-section">
                        <label for="submitbtn">
                            <span class = "submitFile-btn" @click="Submit">게시하기</span>
                        </label>
                        <b-button id = "submitbtn" style="display:none;"></b-button>
                    </div>
                </div>
                <div class="image-preview" >
                    <img class="preview" :src="$store.state.postimage" v-if="$store.state.postimage != null">
                    <img class="preview2"  v-else style="display:none">
                </div>
            </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            content : '',
            selectedFile : null
        }
    },
    methods : {
        onFileSelected(event) {
            this.selectedFile = event.target.files[0];
            const fd = new FormData();
            fd.append('img', this.selectedFile, this.selectedFile.name);
            axios.post('/post/img', fd)
                .then(response => {
                    if(response.status === 200){
                        let url = response.data.url;
                        this.$store.state.postimage = url;
                    }
                })
                .catch()
        },
        Submit(){
            this.$store.dispatch('POST_CONTENT',{
                content : this.content,
                url : this.$store.state.postimage
            });
            this.content = '';
            this.$store.state.postimage = '';
        }
    },
    
}
</script>

<style scoped>
    .mainform{
        width : 80%;
        display : block;
        margin : 50px auto;
        padding : 15px 15px 0 15px; 
        background-color : white;
    }
    .form-group {
        display : block;
        width : 80%;
        margin : 30px auto;
    }
    #textarea1 { 
        margin-bottom : 15px;
    }
    .filebox {
        margin-bottom : 30px;
    }
    /* /////////////////////////////////// */
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
    .file-upload-form {
        margin-bottom : 30px;
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
    /* /////////////////////////////////// */
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
</style>
