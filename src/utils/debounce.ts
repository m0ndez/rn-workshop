export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  waitFor: number
): T => {
  let timeout: NodeJS.Timeout;
  return ((...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  }) as T;
};
