export const temporaryObj = {
  valueTot: 0,
  valueUnit: 0,
  valueGF: 0
};

export const selectElement = (selector: string) =>
  document.querySelector(selector);

export const getValueInput = (selector: string): number => {
  const element = selectElement(selector) as HTMLInputElement;
  return Number(element.value);
};

export const formatNumber = (value: number): string =>
  value.toFixed(2).replace('.', ',');

export const setResultInDiv = (selector: string, value: string) => {
  const div = selectElement(selector);
  if (div) div.innerHTML = value;
};
