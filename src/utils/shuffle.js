
export default function shuffle(array) {
  for (let i = array.length - 1; i; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const swap = array[i];
      array[i] = array[j];
      array[j] = swap;
  }
  return array;
}