<template>
    <header class="header"> CSS GRID</header>
    <div class="built">
      Built with
      <img alt="vite logo" src="./assets/vite.svg"> Vite +
      <img alt="vue logo" src="./assets/vue.png"> Vue 3 and deployed on
      <img alt="vue logo" src="./assets/netlify.svg"> Netlify
    </div>
    <div class="dividing"> </div>
    <section class="main-section">
      <Grid/>
    </section>
</template>

<script setup>
import Grid from './components/Grid.vue'
</script>

<style>
 :root {
   --white: rgb(255, 255, 255, 0.8);
   --white-grey: rgb(255, 255, 255, 0.2)
 }

 body {
   margin: 0;
 }

 #app {
   font-family: Avenir, Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   text-align: center;
   color: #2c3e50;
   min-height: 100vh;
   font-family: -webkit-body;
   padding: 0 10px;
 }

 html {
   background: linear-gradient(180deg, #131321 0, #3b306d);
 }

 .header {
   height: 80px;
   /* border-bottom: 1px solid rgb(255, 255, 255, 0.2); */
   color: var(--white);
   font-size: 60px;
   display: flex;
   align-items: center;
   justify-content: center;
 }
 .dividing {
    height: 2px;
    background: linear-gradient(to left, transparent 0%, var(--white-grey) 50%, transparent 100%);
    margin-bottom: 40px;
 }

 .main-section {
   display: flex;
   align-items: center;
 }

 .built {
   font-family: monospace;
   color: var(--white);
   font-size: 15px;
   font-style: italic;
 }
 .built > img {
   height: 15px;
   position: relative;
   top: 2px;
 }

 @media (max-width: 870px) {
   .main-section {
     flex-flow: column;
   }
 }
</style>