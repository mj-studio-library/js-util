export default function isPrimitive(x: any): boolean {
  return !(typeof x === 'function' || (x !== null && typeof x === 'object') || Array.isArray(x));
}
