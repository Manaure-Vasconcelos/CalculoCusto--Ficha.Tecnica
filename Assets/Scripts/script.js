/* const itensLocale = []; */
let custoTotal = 0;

const showArticle = (src, event) => {
  event.preventDefault();

  const iframe = document.getElementById("iframe");
  iframe.src = `conteudoIframe.html#${src}`;
}

const darkMode = (mode) => {
  const doc = document.querySelector("body");
  const darkMode = document.querySelector(".darkMode");
  doc.style.transition = '5ms ease-in-out';

  if (mode === 'dark') {
    doc.style.color = '#FFFFFF';
    doc.style.backgroundColor = "#121212";
    darkMode.innerHTML = '<span class="material-icons"> light_mode </span>';
  }
  if (mode === 'light') {
    doc.style.color = '#000000';
    doc.style.backgroundColor = "#ffffff";
  }
}

document.addEventListener('click', function (event) {
  const el = event.target;

  if (el.classList.contains('btnAdd')) {
    addFood();
  }
})

document.addEventListener('input', function (event) {
  const el = event.target;

  if (el.classList.contains('inputUnit')) addCustoUni();
  if (el.classList.contains('inputPacket')) addCustoUni();
  if (el.classList.contains('rangeLucro')) addValorFinal();
  if (el.classList.contains('inputGastosFixos')) addCustosFixos();
  if (el.classList.contains('inputVendasPorDias')) addCustosFixos();
  if (el.classList.contains('rangeDiasDeTrabalho')) addCustosFixos();
})

document.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    addFood();
  }
})

/* document.addEventListener("DOMContentLoaded", function () {
  loadItens();
}); */

const addFood = () => {
  const { ingredients, marketWeight, marketPrice, grossWeight } = createItem();
  if (!ingredients || !marketWeight || !marketPrice || !grossWeight) return alert("Preencha os dados corretamente.");

  const table = document.querySelector("#foodTable");
  const newRow = table.insertRow(2);

  const cell1 = newRow.insertCell(0);
  cell1.innerHTML = ingredients;

  const cell2 = newRow.insertCell(1);
  cell2.innerHTML = marketWeight;

  const cell3 = newRow.insertCell(2);
  cell3.innerHTML = `R$ ${marketPrice.toFixed(2)}`;

  const cell4 = newRow.insertCell(3);
  cell4.innerHTML = grossWeight;

  const cell5 = newRow.insertCell(4);
  const costUni = costReal(marketPrice, marketWeight, grossWeight);
  custoTotal += costUni;
  cell5.setAttribute('class', 'thResult')
  cell5.innerHTML = `R$ ${costUni.toFixed(2)}`;

  const cell6 = newRow.insertCell(5);
  const btnEdit = createElement(1);
  cell6.appendChild(btnEdit);

  addCostTot()
  addCustoUni()
  clearInputs();
}

const createItem = () => {
  const item = {
    ingredients: String(document.getElementById("ingredients").value),
    marketWeight: Number(document.getElementById("marketWeight").value),
    marketPrice: Number(document.getElementById("marketPrice").value),
    grossWeight: Number(document.getElementById("grossWeight").value)
  }
  /* savedItens(item) */
  return item;
};

const costReal = (preço, embalagem, uso) => (preço / embalagem) * uso;

const createElement = (el) => {
  if (el === 1) {
    const btn = document.createElement("button");
    btn.setAttribute("id", "btnEdit");
    btn.setAttribute("onclick", "editElement(this)");
    btn.innerHTML = `<span class="material-icons">
      edit
      </span>`;
    return btn
  }

  if (el === 2) {
    const btn = document.createElement("button");
    btn.setAttribute("id", "btnDelete");
    /* btnEdit.setAttribute("onclick", "editElement()"); */
    btn.innerHTML += `<span class="material-icons">
      delete
      </span>`;
    return btn
  }
};

/* const editElement = (el) => {
  el.innerHTML += `alo`;
  const btnDelete = createElement(2)
  cell6.appendChild(btnDelete);
} */

const addCostTot = () => {
  const thCustoTo = document.querySelector("#custoTot");
  thCustoTo.innerHTML = `R$ ${custoTotal.toFixed(2).replace('.', ',')}`;
}

const clearInputs = () => {
  document.getElementById("ingredients").value = '';
  document.getElementById("marketWeight").value = '';
  document.getElementById("marketPrice").value = '';
  document.getElementById("grossWeight").value = '';
  document.getElementById("ingredients").focus();
}

const addCustoUni = () => {
  const divResult = document.querySelector('#divCostUnit');
  const costUnit = custoUni();
  divResult.innerHTML = `R$ ${costUnit}`;
}

const custoUni = () => {
  const inputUnitValue = Number(document.querySelector('#inputUnit').value);
  const inputPacketValue = Number(document.querySelector('#packetValue').value);

  if (!inputUnitValue) return '0,00';
  const result = (custoTotal / inputUnitValue) + inputPacketValue;
  return result.toFixed(2).replace('.', ',');
}

const addCustosFixos = () => {
  const divResult = document.querySelector('#divCustoFixo');
  const gastosFixos = ValorGastosFixo();
  divResult.innerHTML = `R$ ${gastosFixos}`;
}

const ValorGastosFixo = () => {
  const inputGastosFixosValue = Number(document.querySelector('#InputGastosFixos').value);
  const inputVendasPorDiaValue = Number(document.querySelector('#inputVendasPorDia').value);
  const rangeDiasTrabalhadosValue = Number(document.querySelector('#rangeDiasDeTrabalho').value);

  if (!inputGastosFixosValue || !inputVendasPorDiaValue || !rangeDiasTrabalhadosValue) {
    return '0,00';
  } else {
    const diasTrabalhadosMes = rangeDiasTrabalhadosValue * 4;
    const vendasMes = inputVendasPorDiaValue * diasTrabalhadosMes;
    const result = inputGastosFixosValue / vendasMes;
  
    return result.toFixed(2).replace('.', ',');
  }
}

const addValorFinal = () => {
  const divResult = document.querySelector('#divLucro');
  const resultFinal = valorFinal();
  divResult.innerHTML = `R$ ${resultFinal}`;
}

const valorFinal = () => {
  const rangeValue = Number(document.querySelector('#rangeLucro').value);

  const resultFinal = custoTotal + (custoTotal * (rangeValue / 100));
  return resultFinal.toFixed(2).replace('.', ',');
}

/*  const savedItens = (item) => {
   itensLocale.push(item)
   localStorage.setItem('itemList', JSON.stringify(itensLocale));
 };

 const loadItens = () => {
   const savedItens = localStorage.getItem('itemList');

   if (savedItens) {
     const itensLi = JSON.parse(savedItens)
     for (let item of itensLi) {
       addFood(item)
     }
   }
 }

 const clearLocalStorage = () => localStorage.clear()

 setInterval(clearLocalStorage, 60000) */
