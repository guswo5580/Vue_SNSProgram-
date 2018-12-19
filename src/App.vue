<template>
  <div id="app">
    <vue-progress-bar :loading="loading"></vue-progress-bar>
    <transition name="fade" mode="out-in">
      <router-view></router-view>  
    </transition>  
  </div>
</template>

<script>
import { bus } from './utils/bus.js';

export default {
  name: 'app',
  data() {
    return {
      loading : false
    }
  },
  created() {
    bus.$on('on:progress' , () => this.loading = true);
    bus.$on('off:progress', () => this.loading = false);
    // bus.$on('on:progress' , () => console.log('start'));
    // bus.$on('off:progress', () => console.log('end'));
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
