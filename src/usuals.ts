export const custoUni = () => {
  const unitValue = getValueInput('#inputUnit', Number);
  const packetValue = getValueInput('#packetValue', Number);

  if (!unitValue || !temporaryObj.valueTot) return 'R$ 0,00';
  const result = temporaryObj.valueTot / unitValue + packetValue;
  temporaryObj.valueUnit = result;
  return formatNumber(result);
};

export const valorGastosFixo = () => {
  const diasTrabalhados = getValueInput('#rangeDiasDeTrabalho', Number);
  const vendasPorDia = getValueInput('#inputVendasPorDia', Number);
  const gastosFixos = getValueInput('#inputGastosFixos', Number);

  if (!vendasPorDia || !gastosFixos) return '0,00';
  const result = gastosFixos / (diasTrabalhados * 4 * vendasPorDia);
  temporaryObj.valueGF = result;
  return formatNumber(result);
};

export const valorFinal = () => {
  const rangeValue = getValueInput('#rangeLucro', Number);
  const valorFinalProduto = temporaryObj.valueUnit + temporaryObj.valueGF;

  const resultFinal =
    valorFinalProduto + valorFinalProduto * (rangeValue / 100);
  return formatNumber(resultFinal);
};

export const selectElement = (selector: string): typeof selector =>
  document.querySelector(selector);

export const getValueInput = (selector: string, type) =>
  type(selectElement(selector).value);

export const formatNumber = (value: number) =>
  value.toFixed(2).replace('.', ',');
