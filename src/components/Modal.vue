<template>
    <teleport to="body" v-if="codeGenerated.css">
      <div class="modal-page">
        <div class="modal-container" >
          <h3> Grid code </h3>
          <div class="buttons">
          <button @click="isCss = !isCss"> show {{isCss ? 'HTML' : 'CSS'}} </button>
          </div>
          <div class="modal-core" v-html="isCss ? codeGenerated.css : codeGenerated.html"> </div>
          <div class="modal-footer">
            <button @click="done"> OK </button>
          </div>
        </div>
      </div>
    </teleport>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'Modal',
  props: {
    codeGenerated: Object,
  },

  setup(props, context) {
    let isCss = ref(true);
    const done = () => {
      props.codeGenerated.css = null;
    }

    return { isCss, done };
  },
}
</script>

<style>
 .modal-page {
   position: fixed;
    background: #1f1c2ce3;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
 }
 .modal-container {
    width: clamp(300px, 80%, 700px);
    min-height: 300px;
    background:#3f3470;
    padding: 10px 20px 20px 20px;
    color: white;
    font-family: monospace;
    font-size: 15px;
    font-weight: bold;
    display: flex;
    flex-flow: column;
    align-items: center;
    border-radius: 5px;
    border: 1px solid #000000ab;
 }

 .modal-container > h3 {
   font-size: 30px
 }

 .buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: clamp(300px, 80%, 700px);
    margin-bottom: 1px;
 }
 .buttons > button {
   border: 1px solid var(--white);
   outline: none;
 }
 .modal-core {
   background: linear-gradient(180deg,#131321 0,#1f1c2c);
   padding: 20px;
   max-height: 50vh;
   overflow-y: scroll;
   width: 80%;
   line-height: 1.2;
   /* user-select: all; */
 }

 .modal-footer {
   margin: 20px 0;
 }

 span {
   margin: 0;
   padding: 0;
 }

 .class {
   color: yellowgreen;
   font-size: 16px;
 }
 .bracket {
   color: var(--white);
 }

 .key {
   color: #8c81b9;
   margin-left: 15px;
 }

 .value {
   color: #f8a384;
 }

 .childHTML {
   margin-left: 15px;
 }

 .comment {
   color: rgba(255, 255, 255, 0.5);
   user-select: none;
 }

</style>