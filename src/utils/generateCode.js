const createSpan = (text, className) => `<span class="${className}">${text}</span>`;

const bracketOpen = () => createSpan(' { ', 'bracket');

const createKey = (text) => createSpan(text, 'key');
const createValue = (text) => createSpan(text, 'value');

const createDiv = (otherClass = '') => createSpan('div', `class ${otherClass}`);


const cssChild = (child) => {
  return `<br>
  ${createSpan(child.class, 'class')} ${bracketOpen()} <br>
  ${createKey('grid-area')}: ${createValue(child.gridArea)};<br>
  ${createKey('background-color')}: ${createValue(child.backgroundColor)};<br>
  }<br>
  `
}

const htmlChild = (child) => {
  return `
  ${createSpan('','childHTML')}&lt;${createDiv()} ${createSpan(`class="${child.class.split('.')[1]}"`, 'value')}&gt; &lt;/${createDiv()}&gt;<br>
  `
}

export default function generateCode (columns, rows, columnGap, rowGap) {
  // css
  const matches = document.querySelectorAll('.parent > div');
  console.log('allMatches', matches);

  const children = [];

  for (const match of matches) {
    if (match.style.gridArea) {
      children.push({ backgroundColor: match.style.backgroundColor, gridArea: match.style.gridArea, class: match.innerHTML  })
    }
  }
  return {
    css: `
      <div>
        ${createSpan('.parent', 'class')} ${bracketOpen()} <br>
        ${createKey('display')}: ${createValue('grid')}; <br>
        ${createKey('grid-template-columns')}: ${createValue(`repeat(${columns}, 1fr)`)};<br>
        ${createKey('grid-template-rows')}: ${createValue(`repeat(${rows}, 1fr)`)};<br>
        ${createKey('grid-column-gap')}: ${createValue(`${columnGap}px`)};<br>
        ${createKey('grid-row-gap')}: ${createValue(`${rowGap}px`)};<br>
        ${createKey('height')}: ${createValue('500px')}; ${createSpan('//optional', 'comment')}<br>${createKey('width')}: ${createValue('clamp(300px, 80vw, 1200px)')}; ${createSpan('//optional ', 'comment')}<br>
        ${createKey('border')}: ${createValue('1px solid #00000085')}; ${createSpan('//optional ', 'comment')}<br>
        }<br>

        ${children.map(cssChild).join('')}
      </div>`,
    html: `
      &lt;${createDiv()} ${createSpan('class="parent"', 'value')}&gt; <br>
      ${children.map(htmlChild).join('')} ${children.length === 0 ? '<br>' : ''}
      &lt;/${createDiv()}&gt;
    `,
  }
}