<template>
    <div class = "mainform">
        <div class = "form-group">
            <b-form-textarea id="textarea1" v-model="text" placeholder="게시글을 작성해주세요"
                    :rows="3" :max-rows="6">
            </b-form-textarea>

            <div class="filebox"> 
                <div class="file-upload-form">
                    <div class = "imagefile">
                        <label for="inputFile">
                            <span class = "inputFile-btn">사진 업로드</span>
                        </label>
                        <input id="inputFile" type="file" @change="previewImage" accept="image/*" style="display : none;">
                    </div>
                    <div class = "submit-section">
                        <label for="submitbtn">
                            <span class = "submitFile-btn">게시하기</span>
                        </label>
                        <b-button id = "submitbtn" style="display:none;"></b-button>
                    </div>
                </div>
                <div class="image-preview" v-if="imageData.length > 0">
                    <img class="preview" :src="imageData">
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            text : '',
            imageData : ''
        }
    },
    created() {
        // console.log(this.$store.state.user);
    },
    methods : {
        previewImage (event) {
            // Reference to the DOM input element
            var input = event.target;
            // Ensure that you have a file before attempting to read it
            if (input.files && input.files[0]) {
                // create a new FileReader to read this image and convert to base64 format
                var reader = new FileReader();
                // Define a callback function to run, when FileReader finishes its job
                reader.onload = (e) => {
                    // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                    // Read image as base64 and set to imageData
                    this.imageData = e.target.result;
                }
                // Start the reader job - read file as a data url (base64 format)
                reader.readAsDataURL(input.files[0]);
            }
            //image 내용 post 할 것
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
