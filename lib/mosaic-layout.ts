/** Pure tile selection. Safe to import from client components. */
export function chooseMosaic<T extends { empty: boolean }>(items: readonly T[]): T[] {
  const real = items.filter((item) => !item.empty);
  if (real.length < 4) return [...items];
  const posters = items.filter((item) => item.empty);
  return [...real, ...posters.slice(0, Math.floor(real.length / 3))];
}

/** Desktop bento spans that close into a rectangle. */
export function bentoClass(count: number, index: number): string {
  if (count >= 8) {
    const map = [
      "md:col-span-2 md:row-span-2",
      "md:col-span-2 md:row-span-2",
      "md:col-span-2 md:row-span-2",
      "md:col-span-3",
      "md:col-span-3",
      "md:col-span-2 md:row-span-2",
      "md:col-span-2 md:row-span-2",
      "md:col-span-2 md:row-span-2",
    ];
    return map[index] ?? "md:col-span-2";
  }
  if (count === 5) {
    const map = ["md:col-span-4 md:row-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-3", "md:col-span-3"];
    return map[index] ?? "md:col-span-2";
  }
  if (count === 3) {
    return index === 0 ? "md:col-span-4 md:row-span-2" : "md:col-span-2";
  }
  if (count === 4) return "md:col-span-3";
  return "md:col-span-2 md:row-span-2";
}
