export function toFixed(
  number: number | undefined,
  fractionDigits: number,
  defaultString = '',
): string {
  return number?.toFixed?.(fractionDigits) ?? defaultString;
}
