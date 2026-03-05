/**
 * Returns hardcoded prize amount based on rank
 */
export function getHardcodedPrize(rank: number): string {
  if (rank === 1) return '1,500';
  if (rank === 2) return '1,000';
  if (rank === 3) return '500';
  if (rank >= 4 && rank <= 8) return '400';
  return '0';
}
