<template>
        <div class = "board-aligns" >
            <div class = "board-header">
                <slot name="name"></slot>
                <span class = "sub-name">
                    님이 글을 게시했습니다.
                </span>
            </div>
            <div class = "board-main">
                <div class = "main-content">
                    <slot name="content"></slot><br>
                    <slot name="hashtag"></slot>
                </div>
                <div class = "main-image">
                    <slot name="main-image"></slot>    
                </div>
            </div>
            <div class = "board-liker">
                <span class = "like-title">
                    Like >>
                </span>
                <slot name ="like-content"></slot>
            </div>
        </div>
</template>

<script>
export default {

}
</script>

<style>
    .board-aligns {
        display : inline-block;
        width : 40%;
        margin : 20px 2% 20px 4%;
        border : 2px solid rgba(0, 0, 0, 0.1);
        vertical-align: top;
    }
    .board-header {
        border-bottom : 2px solid rgba(0, 0, 0, 0.1);
        padding : 10px;
    }
    
    /* //////////////////////////////////////// */
    .main-content {
        padding : 15px;
    }
    
    .main-image {
        padding : 20px;
        width : 80%;
        margin : 0 auto;
        text-align : center;
    }
    /* ////////////////////////////////////////// */
    .board-liker  {
        padding : 0 15px 10px 15px;
    }
    

    /* ///////////////////////////////////////// */
    
    @media (max-width : 850px) {
        .board-aligns {
            display : block;
            width : 70%;
            margin : 20px auto;
        }
    }
    @media (max-width : 500px) {
        .board-aligns {
            width : 90%;
        }
    }
</style>
