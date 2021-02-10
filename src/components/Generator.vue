<template>
    <div class="inputs">
      <label for="columns"> Columns </label>
      <input id="columns" type="number" name="columns" v-model="columns.value"/>
      <label for="rows"> Rows </label>
      <input id="rows" type="number"  name="rows" v-model="rows.value"/>
      <label for="rowGap"> Row Gap </label>
      <input id="rowGap" type="number" name="rowgap" v-model="rowGap.value"/>
      <label for="columnGap"> Column Gap </label>
      <input id="columnGap" type="number" name="columnGap" v-model="columnGap.value"/>
      <button @click="$emit('reset')"> Reset </button>
      <button @click="$emit('generateCode')"> Generate Code </button>
    </div>
</template>

<script>
import {watch } from 'vue';
export default {
  name: 'Generator',
  props: {
    columns: Object,
    rows: Object,
    rowGap: Object,
    columnGap: Object,
  },

  // to be deleted later
  setup(props, context) {
    const changeCss2 = (newObject) => {
      console.log('Just to know', newObject);
      // parentDiv.style.setProperty(newObject.varCss, Number(newObject.value))
    }

    watch(() => props.columns.value, changeCss2, { deep: true });
  },
}
</script>

<style>
.inputs {
  color: var(--white);
  display: grid;
  grid-template-columns: 50px 100px;
  grid-gap: 20px;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin: 0 20px;
}
.inputs input {
  background: #1f1c2c;
  border: 1px solid rgba(255, 255, 255, 0.205);
  padding: 10px 5px 10px 16px ;
  text-align: center;
  color: white;
  border-radius: 4px;
}

input[type=number]::-webkit-inner-spin-button {
    width: 15px;
    height: 30px;
}

button {
  background: #362C63;
  color: var(--white);
  padding: 10px 14px;
  /* width: 100px; */
  border: none;
  box-shadow: 4px 4px 16px 0px rgba(0, 0, 0, 0.56);
  cursor: pointer;
  border-radius: 5px;
  justify-self: center;
  grid-column: 1 / -1;
  border: 1px solid #4d4c557e;
  transition: box-shadow 0.4s;
}

.inputs > button:hover {
  color: white;
  background: #4d4c557e;
  border: 1px solid var(--white);
  box-shadow: 3px 3px 16px 0px rgba(0, 0, 0, 0.16);
}

@media (min-width: 420px) and (max-width: 870px) {
   .inputs {
     grid-template-columns: 50px 100px 50px 100px;
   }
 }


</style>