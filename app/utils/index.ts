export const getPercentFromTotal = (value: number, total: number): number => Math.round((value / total) * 100) || 0;
