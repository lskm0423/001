export function calculateUtilizationRate(plannedHours: number, actualHours: number): number {
  if (plannedHours <= 0) return 0;
  return Math.round((actualHours / plannedHours) * 100);
}

export function calculateProgress(plannedCount: number, completedCount: number): number {
  if (plannedCount <= 0) return 0;
  return Math.round((completedCount / plannedCount) * 100);
}
