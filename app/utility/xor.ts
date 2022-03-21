export default function xor(expr1: boolean, expr2: boolean): boolean {
  return (expr1 && !expr2) || (!expr1 && expr2);
}
