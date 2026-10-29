/** Pure tile selection. Safe to import from client components. */
export function chooseMosaic<T extends { empty: boolean }>(items: readonly T[]): T[] {
  const real = items.filter((item) => !item.empty);
  const posters = items.filter((item) => item.empty);
  if (real.length === 0) return posters.slice(0, 3);
  if (real.length < 4) return [...real, ...posters.slice(0, Math.max(0, real.length - 1))];
  return [...real, ...posters.slice(0, Math.floor(real.length / 3))];
}
