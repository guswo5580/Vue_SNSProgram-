<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>  
    </transition>  
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
    
  }
}
</script>

<style>
  #app {
    background-color : rgba(0, 0, 0, 0.02);
    font-family: 'Noto Sans', sans-serif;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .4s ease;
  }
  .fade-enter, .fade-leave-to
  /* .routing-fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
