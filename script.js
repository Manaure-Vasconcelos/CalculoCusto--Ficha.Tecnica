(function () {
  loadItems();
  let total = 0;
  const itensLocale = [];

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      addFood();
    }
  })

  const createItem = (elements) => {
    const temp = elements
    const temp2 = [];
    for (let i in temp) {
      temp2.push(temp[i])
    }
    const item = {
      ingredients: String(document.getElementById("ingredients").value),
      marketWeight: Number(document.getElementById("marketWeight").value),
      marketPrice: Number(document.getElementById("marketPrice").value),
      grossWeight: Number(document.getElementById("grossWeight").value)
    } || temp2;
    itensLocale.push(item)
    localStorage.setItem('itemList', JSON.stringify(itensLocale));

    return item;
  };

  function loadItems() {
    const savedItems = localStorage.getItem('itemList');
    const ItensLi = JSON.parse(savedItems)

    if (savedItems) {
      for (let item of ItensLi) {
        addFood(item)
      }
    }
  }

  function addFood() {
    const { ingredients, marketWeight, marketPrice, grossWeight } = createItem();
    const trCustoTotal = document.getElementById("trCustoTotal");
    const Lucro = document.getElementById("Lucro");
    const result = document.getElementById("custoTotal");

    const table = document.getElementById("foodForm");
    const newRow = table.insertRow(2);

    if (ingredients === '' || marketWeight === 0 || marketPrice === 0 || grossWeight === 0) {
      alert("Preencha os dados corretamente.");
    } else {
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

      trCustoTotal.style.opacity = 1;
      result.innerHTML = `R$ ${total.toFixed(2)}`;
      Lucro.innerHTML = `R$ ${total.toFixed(2)}`;
    }
    clearInputs(this.ingredients, this.marketWeight, this.marketPrice, this.grossWeight);
  }

  let costReal = (preço, embalagem, uso) => (preço / embalagem) * uso;

  const createElement = () => {
    const btnEdit = document.createElement("button");
    btnEdit.setAttribute("id", "btnEdit");
    btnEdit.setAttribute("onclick", "editElement()");
    btnEdit.innerHTML = `<span class="material-icons">
        edit
        </span>`;
    return btnEdit
  };

  const clearInputs = (ingredients, marketWeight, marketPrice, grossWeight) => {
    ingredients.value = "";
    marketWeight.value = "";
    marketPrice.value = "";
    grossWeight.value = "";
    ingredients.focus();
  }

  function showArticle(src, event) {
    event.preventDefault();

    const iframe = document.getElementById("iframe");
    iframe.src = `conteudoIframe.html#${src}`;
  }

})();
