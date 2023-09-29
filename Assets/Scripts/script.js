(function () {
  /* const itensLocale = []; */
  const temporaryObj = { valueTot: 0, valueUnit: 0, valueGF: 0, modeStyle: 'dark' };

  /* const showArticle = (src, event) => {
    event.preventDefault();
  
    const iframe = document.getElementById("iframe");
    iframe.src = `conteudoIframe.html#${src}`;
  } */

  const darkMode = () => {
    const doc = document.querySelector("body");
    const darkModeBtn = document.querySelector(".darkMode");

    if (temporaryObj.modeStyle === 'dark') {
      doc.classList.remove('lightTheme');
      doc.classList.add('darkTheme');
      darkModeBtn.innerHTML = '<span class="material-icons"> light_mode </span>';
      temporaryObj.modeStyle = 'light';
    } else if (temporaryObj.modeStyle === 'light') {
      doc.classList.remove('darkTheme');
      doc.classList.add('lightTheme');
      darkModeBtn.innerHTML = '<span class="material-icons"> dark_mode </span>';
      temporaryObj.modeStyle = 'dark';
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    darkMode();
  });

  document.addEventListener('click', function (event) {
    const el = event.target;

    if (el.classList.contains('btnAdd')) addFood();
    if (el.classList.contains('darkMode')) darkMode();
  })

  document.addEventListener('input', function (event) {
    const el = event.target;

    if (el.classList.contains('inputUnit')) addCustoUni();
    if (el.classList.contains('inputPacket')) addCustoUni();
    if (el.classList.contains('rangeLucro')) addValorFinal();
    if (el.classList.contains('rangeDiasDeTrabalho')) addCustosFixos();
    if (el.classList.contains('inputVendasPorDias')) addCustosFixos();
    if (el.classList.contains('inputGastosFixos')) addCustosFixos();
  })

  document.addEventListener('keydown', function (event) {
    const inputs = document.querySelectorAll("#foodTable input");
    if (event.key === 'Enter' && Array.from(inputs).includes(document.activeElement)) addFood();
  })

  const addFood = () => {
    const newItem = new NewItem();
    const { ingredients, marketWeight, marketPrice, grossWeight } = newItem;
    if (!ingredients || !marketWeight || !marketPrice || !grossWeight) return alert("Preencha os dados corretamente.");

    const table = document.querySelector("#foodTable");
    const newRow = table.insertRow(2);

    const cell1 = newRow.insertCell(0);
    cell1.innerHTML = ingredients;

    const cell2 = newRow.insertCell(1);
    cell2.innerHTML = marketWeight;

    const cell3 = newRow.insertCell(2);
    cell3.innerHTML = `R$ ${marketPrice.toFixed(2).replace('.', ',')}`;

    const cell4 = newRow.insertCell(3);
    cell4.innerHTML = grossWeight;

    const cell5 = newRow.insertCell(4);
    const costUni = newItem.costReal();
    temporaryObj.valueTot += costUni;
    cell5.setAttribute('class', 'thResult')
    cell5.innerHTML = `R$ ${costUni.toFixed(2).replace('.', ',')}`;

    const cell6 = newRow.insertCell(5);
    const btnEdit = createElement(1);
    cell6.appendChild(btnEdit);

    addCostTot()
    addCustoUni()
    clearInputs();
  }

  class NewItem {
    constructor() {
      this.ingredients = String(document.getElementById("ingredients").value),
        this.marketWeight = Number(document.getElementById("marketWeight").value),
        this.marketPrice = Number(document.getElementById("marketPrice").value),
        this.grossWeight = Number(document.getElementById("grossWeight").value)
    }
    /* savedItens(item) */
  };

  NewItem.prototype.costReal = function () {
    return (this.marketPrice / this.marketWeight) * this.grossWeight;
  }

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
    const result = temporaryObj.valueTot.toFixed(2).replace('.', ',');
    thCustoTo.innerHTML = `R$ ${result}`;
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
    const unitValue = Number(document.querySelector('#inputUnit').value);
    const packetValue = Number(document.querySelector('#packetValue').value);

    if (!unitValue || !temporaryObj.valueTot) return '0,00';
    const result = (temporaryObj.valueTot / unitValue) + packetValue;
    temporaryObj.valueUnit = result;
    return result.toFixed(2).replace('.', ',');
  }

  const addCustosFixos = () => {
    const divResult = document.querySelector('#divCustoFixo');
    const gastosFixos = valorGastosFixo();
    divResult.innerHTML = `R$ ${gastosFixos}`;
  }

  const valorGastosFixo = () => {
    const diasTrabalhados = Number(document.querySelector('#rangeDiasDeTrabalho').value);
    const vendasPorDia = Number(document.querySelector('#inputVendasPorDia').value);
    const gastosFixos = Number(document.querySelector('#inputGastosFixos').value);

    if (!vendasPorDia, !gastosFixos) return '0,00';
    const result = gastosFixos / ((diasTrabalhados * 4) * vendasPorDia);
    temporaryObj.valueGF = result;
    return result.toFixed(2).replace('.', ',');
  }

  const addValorFinal = () => {
    const divResult = document.querySelector('#divLucro');
    const resultFinal = valorFinal();
    divResult.innerHTML = `R$ ${resultFinal}`;
  }

  const valorFinal = () => {
    const rangeValue = Number(document.querySelector('#rangeLucro').value);
    const valorFinalProduto = temporaryObj.valueUnit + temporaryObj.valueGF;

    const resultFinal = valorFinalProduto + (valorFinalProduto * (rangeValue / 100));
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
})()