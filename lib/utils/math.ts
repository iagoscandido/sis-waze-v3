export const getTrendingPercentage = (
  delay: number,
  seconds: number
): number => {
  if (seconds === 0) {
    return delay > 0 ? 100 : 0;
  }

  const percentage = (delay / seconds) * 100;

  return percentage;
};
