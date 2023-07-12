/**
 * Calculate sum of numbers array.
 * @param numbers Array of numbers.
 */
export function getSum(numbers: number[]) {
  return numbers.reduce((a, b) => a + b, 0);
}
