import { addCustoUni, addCustosFixos, addValorFinal } from './business';
import { selectElement, formatNumber, temporaryObj } from './utils';
import {
  valueIngredient,
  valueMarketWeight,
  valueMarketPrice,
  valueGrossWeight
} from './selected';

document.addEventListener('click', function (event: MouseEvent) {
  const el = event.target as HTMLElement;

  if (el.classList.contains('btnAdd')) {
    const food = new Food(
      valueIngredient,
      valueMarketWeight,
      valueMarketPrice,
      valueGrossWeight
    );
    food.addFood();
  }
});

document.addEventListener('input', function (event: Event) {
  const el = event.target as HTMLElement;

  if (
    el.classList.contains('inputUnit') ||
    el.classList.contains('inputPacket')
  ) {
    addCustoUni();
  }
  if (el.classList.contains('rangeLucro')) {
    addValorFinal();
  }
  if (
    el.classList.contains('rangeDiasDeTrabalho') ||
    el.classList.contains('inputVendasPorDias') ||
    el.classList.contains('inputGastosFixos')
  ) {
    addCustosFixos();
  }
});

document.addEventListener('keydown', function (event: KeyboardEvent) {
  const inputs = document.querySelectorAll<HTMLElement>('#foodTable input');
  if (
    event.key === 'Enter' &&
    Array.from(inputs).includes(document.activeElement as HTMLElement)
  ) {
    const food = new Food(
      valueIngredient,
      valueMarketWeight,
      valueMarketPrice,
      valueGrossWeight
    );
    food.addFood();
  }
});

class Food {
  constructor(
    public ingredients: string,
    public marketWeight: number,
    public marketPrice: number,
    public grossWeight: number
  ) {}

  addFood() {
    if (!Food.validInputs()) return;

    const table = selectElement('#foodTable') as HTMLTableElement | null;
    if (!table) {
      console.error('Table element not found');
      return;
    }

    const newRow = table.insertRow(2);

    const cell1 = newRow.insertCell(0);
    cell1.innerHTML = this.ingredients;

    const cell2 = newRow.insertCell(1);
    cell2.innerHTML = this.marketWeight.toString();

    const cell3 = newRow.insertCell(2);
    cell3.innerHTML = `R$ ${formatNumber(this.marketPrice)}`;

    const cell4 = newRow.insertCell(3);
    cell4.innerHTML = this.grossWeight.toString();

    const cell5 = newRow.insertCell(4);
    const costUni = this.costReal();
    temporaryObj.valueTot += costUni;
    cell5.setAttribute('class', 'thResult');
    cell5.innerHTML = `R$ ${formatNumber(costUni)}`;

    this.addCostTot();
    addCustoUni();
    Food.clearInputs();
  }

  costReal(): number {
    return (this.marketPrice / this.marketWeight) * this.grossWeight;
  }

  addCostTot(): void {
    const div = selectElement('#custoTot');
    const tot = formatNumber(temporaryObj.valueTot);
    if (div) div.innerHTML = `R$ ${tot}`;
  }

  static validInputs(): boolean {
    for (const input of document.querySelectorAll('.inputForm')) {
      if (input instanceof HTMLInputElement) {
        if (!input.value) {
          alert('Preencha os dados corretamente.');
          input.focus();
          return false;
        }
      }
    }
    return true;
  }

  static clearInputs() {
    for (const input of document.querySelectorAll('.inputForm')) {
      if (input instanceof HTMLInputElement) input.value = '';
    }
    const element = selectElement('#ingredients') as HTMLInputElement;
    if (element) element.focus();
  }
}
