export const valorGastosFixo = () => {
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
/* 
  Refatorar gastos fixos.

  Fazer o valor medio de agua, luz e gas. => Dar dicar para pequeno empreendedor. A fazer um valor medio para colocar nos gastos.
  Ex: Se o usuario trabalha em casa e o gasto das contas são divididas entre casa e empresa.
  - Fazer os dias trabalhados no mes => diasTrabalhados * 4 
  - De acordo com a quantidade de dias é estipulado o valor medio => 1/3 ou 1/2
  - Pegar o valor total dos gastos somados e dividir proporcionalmente de acordo com os dias trabalhados

  Ou Realmente usar esse metodo aqui. 
  Pq pega os dias trabalhados e a media de vendas por dia. => ensina a fazer media.
  E divide os valores dos gastos.
  Se o usuario tiver mais de um produto no cardapio => outro valor de gasto fixos.
  const result = gastosFixos / (diasTrabalhados * 4 * vendasPorDia);

  Ou aqui é um ademais. usa-se em outra tabela a parte.
  - Realmente uso o primeiro metodo dos gastos fixos convencional
  - Depois uso o segundo metodo calculando o numero de vendas por dias e os dias trabalhados
  - O numero de vendas por dia seria não só do produto em si, e sim de todos os seus produtos disponiveis.
  - Assim tiraria o valor fixo real.
*/
