<template>
    <div id="parent" class="parent" @mouseup="onMouseOutsideDiv()" @mousedown="onMouseOutsideDiv()">
      <div
        v-bind:id="index"
        v-for="(item, index) in items"
        v-bind:key="index"
        @mousedown="onMouseDown(index); $event.stopPropagation()"
        @mouseup="onMouseUp(index); $event.stopPropagation()"
        >
      </div>
    </div>
    <Generator
      v-bind:columns="columns"
      v-bind:rows="rows"
      v-bind:rowGap="rowGap"
      v-bind:columnGap="columnGap"
      v-on:reset="reset"
      v-on:generateCode="generateCode"/>
    <Modal1 v-bind:codeGenerated="codeGenerated"/>
</template>

<script>


import { ref, onMounted, watch, computed  } from 'vue';
import Generator from './Generator.vue'
import Modal1 from './Modal.vue'
import * as Color from '../utils/color';
import GenerateCode from '../utils/generateCode';
export default {
  name: 'Grid',
  components: { Generator, Modal1 },

  setup(props, context) {
     let parentDiv = null;

// ref
    let columns = ref({ value: 5, varCss: '--columns'});
    let rows = ref({ value: 5, varCss: '--rows'});
    let rowGap = ref({ value: 0, varCss: '--row-gap'});
    let columnGap = ref({ value: 0, varCss: '--column-gap'});
    let divCounter = ref(0);
    let selectedStart = ref(null);
    let selectedEnd = ref(null);
    let codeGenerated = ref({ css: '', html: ''});

// methods
    const generateCode = () => {
      codeGenerated.value = GenerateCode(columns.value.value, rows.value.value, columnGap.value.value, rowGap.value.value);
      console.log('codeGenerated.value.css', codeGenerated.value.css);

    }


// computed
    let items = computed(() => [...Array((columns.value.value * rows.value.value))])

// watchers
    const changeCss = (newObject) => {
      parentDiv.style.setProperty(newObject.varCss, Number(newObject.value))
      if (['--columns', '--rows'].includes(newObject.varCss)) {
        divCounter.value = 0;
        Color.reset()
      }
    }
    const createRgb = () => {
      if (selectedStart.value === null || selectedEnd.value === null) {
        selectedStart.value = null;
        selectedEnd.value = null;
        return;
      }
      const done = Color.set(selectedStart.value, selectedEnd.value, columns.value.value, divCounter.value);
      if (done) divCounter.value += 1;
      selectedStart.value = null;
      selectedEnd.value = null;
    }

    watch(() => columns.value, changeCss, { deep: true });
    watch(() => rows.value, changeCss, { deep: true });
    watch(() => rowGap.value, changeCss, { deep: true });
    watch(() => columnGap.value, changeCss, { deep: true });

    watch(() => selectedEnd.value, createRgb);

// lifecycle
    onMounted(() => {
      parentDiv = document.getElementById('parent');
    });

    return { items, columns, rows, rowGap, columnGap, selectedStart, selectedEnd, divCounter, generateCode, codeGenerated }
  },
  methods: {
    onMouseDown(index) {
      if (document.getElementById(index).style.gridArea) {
        return;
      }
      this.selectedStart = index;
    },
    onMouseUp(index) {
      if (document.getElementById(index).style.gridArea) {
        return;
      }
      this.selectedEnd = index;
    },
    onMouseOutsideDiv() {
      this.selectedStart = null;
      this.selectedEnd = null;
    },
    reset() {
      this.columns.value = 5;
      this.rows.value = 5;
      this.rowGap.value = 0;
      this.columnGap.value = 0;
      this.columnGap.value = 0;
      this.divCounter = 0;
      Color.reset()
    }
  },
}
</script>

<style>
.parent {
  --columns: 5;
  --rows: 5;
  --column-gap: 0;
  --row-gap: 0;
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  grid-template-rows: repeat(var(--rows), 1fr);
  grid-column-gap: calc(var(--column-gap) * 1px);
  grid-row-gap: calc(var(--row-gap) * 1px);
  height: 500px;
  width: clamp(300px, 80vw, 1200px);
  background: grey;
  outline: 1px solid #6553b3;
  box-shadow: 0 2px 20px 0 #000;
  margin-bottom: 20px;
  background: linear-gradient(180deg,#131321 0,#1f1c2c);
  user-select: none;
  cursor: cell;
}


.parent > div {
  color: var(--white);
  border: 1px solid var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
}
.parent > div:hover {
  background: rgba(45,38,83, 0.2)
}

</style>