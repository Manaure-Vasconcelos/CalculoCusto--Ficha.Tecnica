let total = 0;
function addFood() {
  // Retrieve form input values
  const ingredients = document.getElementById("ingredients").value;
  const marketWeight = Number(document.getElementById("marketWeight").value);
  const marketPrice = Number(document.getElementById("marketPrice").value);
  const grossWeight = Number(document.getElementById("grossWeight").value);
  const trCustoTotal = document.getElementById("trCustoTotal");
  const Lucro = document.getElementById("Lucro");
  const result = document.getElementById("custoTotal");

  // Create a new table row
  const table = document.getElementById("foodTable");
  const newRow = table.insertRow(1);

  if (
    (ingredients,
    marketWeight,
    marketPrice,
    grossWeight === "")
  ) {
    alert("Preencha os dados corretamente.");
  } else {
    let costReal = (preço, embalagem, uso) => (preço / embalagem) * uso;
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

    const btnEdit = document.createElement("button");
    btnEdit.setAttribute("id", "btnEdit");
    btnEdit.setAttribute("onclick", "editElement()");
    btnEdit.innerHTML = `<span class="material-icons">
    edit
    </span>`;
    const cell6 = newRow.insertCell(5);
    cell6.appendChild(btnEdit);

    trCustoTotal.style.opacity = 1;
    result.innerHTML = `R$ ${total.toFixed(2)}`;
    Lucro.innerHTML = `R$ ${total.toFixed(2)}`;
  }
  // Clear value inputs and focus
}

function editElement(){
    /*const btnEdit = document.getElementById("btnEdit");
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
    </span>`;*/

}

/*function CostPor(){
  const porcao = Number(document.getElementById("porcao").value);
  const resultPor = document.getElementById("custoPorcao");

  resultPor.innerHTML = total / porcao;
}*/
