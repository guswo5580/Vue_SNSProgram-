<template>
    <div class = "image-container">
        <b-carousel id="carousel1" background="#ababab" :interval="4000" img-width="640" img-height="400"
                v-model="slide" @sliding-start="onSlideStart" @sliding-end="onSlideEnd">

            <b-carousel-slide img-src="https://i.postimg.cc/yNc4Y0SW/image1.jpg"></b-carousel-slide>
            <b-carousel-slide img-src="https://i.postimg.cc/pr4NK6J0/iamge2.jpg"></b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
    data () {
        return {
            slide: 0,
            sliding: null
        }
    },
    methods: {
        onSlideStart () {
            this.sliding = true
        },
        onSlideEnd () {
            this.sliding = false
        }
    }
}
</script>

<style scoped>
    .image-container {
        
    }
</style>
