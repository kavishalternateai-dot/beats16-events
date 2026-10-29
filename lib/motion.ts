export const ease = {
  silk: [0.22, 1, 0.36, 1],
  curtain: [0.65, 0, 0.35, 1],
  breath: [0.45, 0, 0.55, 1],
} as const;

export const dur = { micro: 0.2, short: 0.4, medium: 0.8, long: 1.2, hero: 1.6 } as const;

export const stagger = { tight: 0.06, word: 0.08, card: 0.1 } as const;

export const inViewOnce = { once: true, amount: 0.35 } as const;

export const inViewMobile = { once: true, amount: 0.25 } as const;

/** px. Never more than 32. */
export const rise = 24;
