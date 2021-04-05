export const reducer = (accumulator: number, currentValue: number) => {
  return accumulator && currentValue && accumulator + currentValue;
};

export const setInputNumberFormat = (value: string) => {
  const filterCharacter = value.replace(/[^0-9\.]/g, ''); // 입력값이 숫자가 아니면 공백
  const startedCharacted = filterCharacter.replace(/^[0]/, '');
  return startedCharacted;
};

export function setNumberFormatWithComma(value: string) {
  const valueNum = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return valueNum;
}
