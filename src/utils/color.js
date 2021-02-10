const randomRgba = () => {
  const r = Math.floor(Math.random() * 255 + 1);
  const g = Math.floor(Math.random() * 255 + 1);
  const b = Math.floor(Math.random() * 255 + 1);

  return `rgba(${r}, ${g}, ${b}, 0.5)`;
}

const edit = (elements, coordinates, divCounter) => {
const allMatches = [...document.querySelectorAll(elements.map(elem => `.parent > div:nth-child(${elem + 1})`).join(', '))]
  const match1 = allMatches[0]
  const matches2 = allMatches.slice(1)
  if (!match1) {
    return;
  }
  for (const match of allMatches) {
    if (match.style.display === 'none') return;
  }

  match1.style.backgroundColor = randomRgba();
  match1.style.gridArea = coordinates.join('/')
  match1.innerHTML = `.div${divCounter + 1}`;

  if (matches2.length > 0) {
    for (const match of matches2) {
      match.style.display = 'none';
    }
  }
  return 1;
}

export const reset = () => {
  const matches = document.querySelectorAll(`.parent > div`);
  for (const match of matches) {
    match.style.backgroundColor = 'inherit';
    match.style.gridArea = null;
    match.style.display = 'flex';
    match.innerHTML = '';
  }
}

const findElements = (start, end, column) => {
  let x1 = Math.floor((start) % column)
  let y1 = Math.floor((start) / column)
  let x2 = Math.floor((end) % column)
  let y2 = Math.floor((end) / column)

  if (x1 > x2) {
    [x1, x2] = [x2, x1]
  }
  if (y1 > y2) {
    y1 = y2
  }

  const arr = [];

  const iStart = start > column ? start- column : 0;

  for (let i = iStart; i <= end + column; i++) {
    const x = Math.floor((i) % column)
    const y = Math.floor((i) / column)

    if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
      arr.push(i)
    }
  }
  return { elements: arr, coordinates: [y1 + 1, x1 + 1, y2 + 2, x2 + 2] };
}

export function set (start, end, column, divCounter) {
  const info = findElements(start > end ? end : start, start > end ? start : end, column);
  if (info && info.elements && info.elements.length > 0) {
    const done = edit(info.elements, info.coordinates, divCounter)
    return done;
  }
}
