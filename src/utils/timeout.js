
export default function timeout(milliseconds) {
  return new Promise(result => setTimeout(result, milliseconds));
}