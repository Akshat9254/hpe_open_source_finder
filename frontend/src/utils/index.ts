export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

export const formatLargeNumber = (num: number) => {
  const suffixes = ["", "K", "M", "B", "T"];
  const magnitude = Math.floor(Math.log10(num) / 3);
  const divisor = Math.pow(10, magnitude * 3);
  const scaled = num / divisor;
  const suffix = suffixes[magnitude];
  return scaled.toFixed(1) + suffix;
};
