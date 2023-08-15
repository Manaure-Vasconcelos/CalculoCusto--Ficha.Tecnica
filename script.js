(function () {
  const itensLocale = [];
  let total = 0;

  const showArticle = (src, event) => {
    event.preventDefault();

    const iframe = document.getElementById("iframe");
    iframe.src = `conteudoIframe.html#${src}`;
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      addFood();
    }
  })

  document.addEventListener("DOMContentLoaded", function () {
    loadItens();
  });

  const addFood = (item) => {
    const el = item
    const { ingredients, marketWeight, marketPrice, grossWeight } = el || createItem();

    if (!ingredients || !marketWeight || !marketPrice || !grossWeight) return alert("Preencha os dados corretamente.");

    const table = document.querySelector(".foodTable");
    const newRow = table.insertRow(-1);
    // Add cells to the new row
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
    total += costUni;
    cell5.innerHTML = `R$ ${costUni.toFixed(2)}`;

    const cell6 = newRow.insertCell(5);
    const btnEdit = createElement();
    cell6.appendChild(btnEdit);

    clearInputs();
  }

  const createItem = () => {
    const item = {
      ingredients: String(document.getElementById("ingredients").value),
      marketWeight: Number(document.getElementById("marketWeight").value),
      marketPrice: Number(document.getElementById("marketPrice").value),
      grossWeight: Number(document.getElementById("grossWeight").value)
    }
    savedItens(item)
    return item;
  };
  
  const costReal = (preço, embalagem, uso) => (preço / embalagem) * uso;
  
  const createElement = () => {
    const btnEdit = document.createElement("button");
    btnEdit.setAttribute("id", "btnEdit");
    btnEdit.setAttribute("onclick", "editElement()");
    btnEdit.innerHTML = `<span class="material-icons">
    edit
    </span>`;
    return btnEdit
  };

  const clearInputs = () => {
    document.getElementById("ingredients").value = '';
    document.getElementById("marketWeight").value = '';
    document.getElementById("marketPrice").value = '';
    document.getElementById("grossWeight").value = '';
    document.getElementById("ingredients").focus();
  }

  const savedItens = (item) => {
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

  /* (function () { document.setInterval(localStorage.clear(), 30000) })(); */
})();
