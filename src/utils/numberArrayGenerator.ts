export const numberArrayGeneratoor = (arrayLength: number): number[] => {
  return new Array(arrayLength).fill(null).map(() => Math.ceil(Math.random() * 100));
};
