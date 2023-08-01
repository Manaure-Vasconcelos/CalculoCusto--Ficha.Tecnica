const ingredientsInput = document.getElementById("ingredients");
const marketWeightInput = document.getElementById("marketWeight");
const marketPriceInput = document.getElementById("marketPrice");
const grossWeightInput = document.getElementById("grossWeight");
const trCustoTotal = document.getElementById("trCustoTotal");
const Lucro = document.getElementById("Lucro");
const result = document.getElementById("custoTotal");
let total = 0;

document.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    addFood();
  }
})

function addFood() {
  // Create a new table row
  const ingredients = String(ingredientsInput.value);
  const marketWeight = Number(marketWeightInput.value);
  const marketPrice = Number(marketPriceInput.value);
  const grossWeight = Number(grossWeightInput.value);

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
  clearInputs();
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

function clearInputs() {
  ingredientsInput.value = "";
  marketWeightInput.value = "";
  marketPriceInput.value = "";
  grossWeightInput.value = "";
  ingredientsInput.focus();
}

function showArticle(src, event) {
  event.preventDefault();

  const iframe = document.getElementById("iframe");
  iframe.src = `conteudoIframe.html#${src}`;
}
/* function editElement() {
  const table = document.getElementById("foodTable")
  const btnEdit = document.getElementById("btnEdit");
  btnEdit.style.display = "none";
  const btnDone = document.createElement("button");
  btnDone.setAttribute("id", "btnDone");
  btnDone.setAttribute("onclick", "addFood()");
  btnDone.innerHTML = `<span class="material-icons">
    done
    </span>`;
  const btnDelete = document.createElement("button");
  btnDelete.setAttribute("id", "btnDelete");
  btnDelete.setAttribute("onclick", "deleteElement()");
  btnDelete.innerHTML = `<span class="material-icons">
    delete
    </span>`;

} */

