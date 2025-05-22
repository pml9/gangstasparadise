/**
 * Utility function to simulate network delay
 * @param ms - Delay duration in milliseconds (default: 1000ms)
 */
export const delay = (ms: number = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
