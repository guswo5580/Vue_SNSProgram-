<template>
    <div class = "header-container">
        <nav>
            <div class = "header">
                    <div class = "logo-container" @click="LinkToHome">
                        <span class = "logo-image"><i class="far fa-paper-plane fa-2x" @click="LinkToHome"></i></span>
                        <span class = "divide" @click="LinkToHome">&nbsp;</span>
                        <span class = "logo-text" @click="LinkToHome">peaceocean</span>
                    </div>
                <div class = "search-container">
                    <div class = "form-group">
                        <b-form-input v-model="search" type="text" placeholder="해시태그 검색"
                                    @keyup.enter.native="Search"></b-form-input>
                    </div>
                    <div class = "form-button">
                        <b-button class = "submit-button" @click="Search"><i class="fas fa-search"></i></b-button>
                    </div>
                </div>
                <div class = "nav-container">
                    <div class = "profile-section">
                        <span class = "profile"><router-link :to=" { name : 'profile' }">
                            <i class="far fa-user fa-2x">
                                <!-- <span class = "tooltiptext">프로필 바로가기</span> -->
                            </i>
                            </router-link></span>
                    </div>
                    <div class = "logout-section">
                        <span class = "logout" @click="Logout">
                            <i class="fas fa-sign-out-alt fa-2x">
                                <!-- <span class = "tooltiptext">로그아웃</span> -->
                            </i></span>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    data(){
        return {
            search : '',
        }
    },
    methods : {
        Logout(){
            this.$store.dispatch('POST_LOGOUT');
        },
        Search(){
            if(this.$router.history.current.name === 'home'){
                this.$store.dispatch('SEARCH_TAG', {
                    tag : this.search
                });
                localStorage.setItem('tag', this.search);
                //tag의 속성으로 key를 정해놓으면 굳이 비워줄 필요가 없다.
                this.search = '';
            }else {
                this.$router.push( { name : 'home' } );
                this.$store.dispatch('SEARCH_TAG', {
                    tag : this.search
                });
                localStorage.setItem('tag', this.search);
                //tag의 속성으로 key를 정해놓으면 굳이 비워줄 필요가 없다.
                this.search = '';
            }
            
        },
        LinkToHome(){
            this.$router.push(
                {
                    name : 'home'
                }
            )
            this.$store.state.changeboard = false;
        }
    }
}
</script>

<style scoped>
    .header {
        display : flex;
        align-items : center;
        padding : 20px;
    }
    .logo-container {
        display : flex;
        align-items : center;
        width : 27%;
        margin-left : 15px;
        flex-shrink: 0; 
    }
    .routing {
        text-decoration: none;  
        color : #262626;
    }
    .logo-container:hover,
    .logo-container:active{
        color : rgb(66, 164, 244);
    }
    .divide {
        background-color: #262626;
        height: 32px;
        margin: 0 25px;
        width: 2px;
    }
    .logo-text {
        font-size : 2rem;
        font-weight: bold;
    }
    /* ///////////////////////////// */
    .search-container {
        width : 50%;
        display : flex;
        justify-content: center;
        padding : 20px 0 0 0;
        flex-shrink: 1;
    }
    .form-group {
        width : 50%;
    }
    /* //////////////////////////// */
    .nav-container {
        display : flex;
        justify-content: center;
        flex-shrink : 0;
        width : 23%;
    }
    .nav-container a {
        color : black;
    }
    .nav-container a:hover {
        color : rgb(66, 164, 244);
    }
    .profile-section {
        margin-right : 50px;
    }
    .logout:hover{
        color : rgb(66, 164, 244);
    }
    /* .tooltiptext{
        visibility: hidden;
        width : 120px;
        background-color : white;
        color : black;
        font-size : 0.6rem;
        text-align: center;
        border-radius: 6px;
        padding : 5px 0;
        position : relative;
        z-index: 1;
    }
    .tooltiptext:hover{
        visibility: visible;
    } */
/* ////////////////////////////////////// */
    @media (max-width : 700px) {
        .logo-container {
            width : 20%;
        }
        .logo-text {
            display : none;
        }
        
    }
    @media (max-width : 500px) {
        .header {
            padding : 5px;
        }
        .logo-container {
            width : 15%;
        }
        .search-container {
            width : 50%;
        }
        .form-group {
            width : 70%;
        }
        .logo-text , .divide {
            display : none;
        }
        .nav-container {
            width : 30%;
            justify-content: center;
            margin-right : 20px;
        }
        .profile-section {
            margin-right : 30px;
        }
    }
</style>
