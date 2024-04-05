import {
  getValueInput,
  formatNumber,
  temporaryObj,
  setResultInDiv
} from './utils';

export const custoUni = () => {
  const unitValue = getValueInput('#inputUnit', Number);
  const packetValue = getValueInput('#packetValue', Number);

  if (!unitValue || !temporaryObj.valueTot) return 'R$ 0,00';
  if (typeof unitValue === 'number' && typeof packetValue === 'number') {
    const result = temporaryObj.valueTot / unitValue + packetValue;
    temporaryObj.valueUnit = result;
    return formatNumber(result);
  }
  return '0,00';
};

export const valorGastosFixo = () => {
  const diasTrabalhados = getValueInput('#rangeDiasDeTrabalho', Number);
  const vendasPorDia = getValueInput('#inputVendasPorDia', Number);
  const gastosFixos = getValueInput('#inputGastosFixos', Number);

  if (vendasPorDia === undefined || gastosFixos === undefined) return '0,00';
  if (
    typeof gastosFixos === 'number' &&
    typeof diasTrabalhados === 'number' &&
    typeof vendasPorDia === 'number'
  ) {
    const result = gastosFixos / (diasTrabalhados * 4 * vendasPorDia);

    if (!isNaN(result)) {
      temporaryObj.valueGF = result;
      return formatNumber(result);
    }
  }
  return '0,00';
};

export const valorFinal = () => {
  const rangeValue = getValueInput('#rangeLucro', Number);
  const valorFinalProduto = temporaryObj.valueUnit + temporaryObj.valueGF;
  if (typeof rangeValue === 'number') {
    const resultFinal =
      valorFinalProduto + valorFinalProduto * (rangeValue / 100);
    return formatNumber(resultFinal);
  }
  return '0,00';
};

export const addCustoUni = () => {
  const value = custoUni();
  setResultInDiv('#divCostUnit', value);
};

export const addCustosFixos = () => {
  const value = valorGastosFixo();
  setResultInDiv('#divCustoFixo', value);
};
export const addValorFinal = () => {
  const value = valorFinal();
  setResultInDiv('#divLucro', value);
};
