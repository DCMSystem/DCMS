export const reducer = (accumulator: number, currentValue: number) => {
  return accumulator && currentValue && accumulator + currentValue;
};
