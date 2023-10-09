(function () {
  /* const itensLocale = []; */
  const temporaryObj = { valueTot: 0, valueUnit: 0, valueGF: 0, modeStyle: 'dark' };

  /* const showArticle = (src, event) => {
    event.preventDefault();
    
    const iframe = document.getElementById("iframe");
    iframe.src = `conteudoIframe.html#${src}`;
  } */
  
  const darkMode = () => {
    const doc = selectElement('body');
    const darkModeBtn = selectElement('.darkMode');

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

  document.addEventListener("DOMContentLoaded", function (e) {
    e.preventDefault();
    darkMode();
  });

  document.addEventListener('click', function (event) {
    const el = event.target;
    
    if (el.classList.contains('darkMode')) darkMode();
    if (el.classList.contains('btnAdd')) {
      const food = new Food();
      food.addFood();
    };
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
    if (event.key === 'Enter' && Array.from(inputs).includes(document.activeElement)) {
      const food = new Food();
      food.addFood();
    }
  })

  class Food {
    constructor() {
      this.ingredients = getValueInput('#ingredients', String)
      this.marketWeight = getValueInput('#marketWeight', Number)
      this.marketPrice = getValueInput('#marketPrice', Number)
      this.grossWeight = getValueInput('#grossWeight', Number)
    }

    addFood() {
      for (const input of document.querySelectorAll('.inputForm')) {
        if(!input.value) {
          alert("Preencha os dados corretamente.");
          input.focus();
          return
        }
      }

      const table = selectElement("#foodTable");
      const newRow = table.insertRow(2);

      const cell1 = newRow.insertCell(0);
      cell1.innerHTML = this.ingredients;

      const cell2 = newRow.insertCell(1);
      cell2.innerHTML = this.marketWeight;

      const cell3 = newRow.insertCell(2);
      cell3.innerHTML = `R$ ${formatNumber(this.marketPrice)}`;
      
      const cell4 = newRow.insertCell(3);
      cell4.innerHTML = this.grossWeight;
      
      const cell5 = newRow.insertCell(4);
      const costUni = this.costReal;
      temporaryObj.valueTot += costUni;
      cell5.setAttribute('class', 'thResult')
      cell5.innerHTML = `R$ ${formatNumber(costUni)}`;

      const cell6 = newRow.insertCell(5);
      const btnEdit = Food.createButtonElement(1);
      cell6.appendChild(btnEdit);

      this.addCostTot();
      addCustoUni()
      Food.clearInputs();
    }
    
    get costReal() {
      return (this.marketPrice / this.marketWeight) * this.grossWeight;
    }

    addCostTot() {
      const div = selectElement('#custoTot');
      const tot = formatNumber(temporaryObj.valueTot);
      div.innerHTML = `R$ ${tot}`;
    }
    
    static createButtonElement(el) {
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

    static clearInputs() {
      for (const input of document.querySelectorAll('.inputForm')) {
        input.value ="";
      }
      selectElement('#ingredients').focus();
    }
  }

  const addCustoUni = () => addValue(custoUni, '#divCostUnit');
  const addCustosFixos = () => addValue(valorGastosFixo, '#divCustoFixo');
  const addValorFinal = () => addValue(valorFinal, '#divLucro');

  const addValue = (calcFunction, selector) => {
    const value = calcFunction();
    setResultInDiv(selector, value);
  };

  const setResultInDiv = (selector, value) => {
    const div = selectElement(selector);
    div.innerHTML = value;
  };

  const custoUni = () => {
    const unitValue = getValueInput('#inputUnit', Number);
    const packetValue = getValueInput('#packetValue', Number);

    if (!unitValue || !temporaryObj.valueTot) return 'R$ 0,00';
    const result = (temporaryObj.valueTot / unitValue) + packetValue;
    temporaryObj.valueUnit = result;
    return formatNumber(result);
  }

  const valorGastosFixo = () => {
    const diasTrabalhados = getValueInput('#rangeDiasDeTrabalho', Number);
    const vendasPorDia = getValueInput('#inputVendasPorDia', Number);
    const gastosFixos = getValueInput('#inputGastosFixos', Number);

    if (!vendasPorDia || !gastosFixos) return '0,00';
    const result = gastosFixos / ((diasTrabalhados * 4) * vendasPorDia);
    temporaryObj.valueGF = result;
    return formatNumber(result);
  }

  const valorFinal = () => {
    const rangeValue = getValueInput('#rangeLucro', Number);
    const valorFinalProduto = temporaryObj.valueUnit + temporaryObj.valueGF;

    const resultFinal = valorFinalProduto + (valorFinalProduto * (rangeValue / 100));
    return formatNumber(resultFinal);
  }

  const selectElement = (selector) => document.querySelector(selector);

  const getValueInput = (selector, type) => type(document.querySelector(selector).value);

  const formatNumber = (value) => value.toFixed(2).replace('.', ',');
  
})()
