let total = 0;
function addFood() {
  // Retrieve form input values
  const ingredients = document.getElementById("ingredients").value;
  const typeFood = document.getElementById("typeFood").value;
  const marketWeight = Number(document.getElementById("marketWeight").value);
  const marketPrice = Number(document.getElementById("marketPrice").value);
  const grossWeight = Number(document.getElementById("grossWeight").value);
  const trCustoTotal = document.getElementById("trCustoTotal");
  //const trCustoPorcao = document.getElementById("trCustoPorcao");
  const result = document.getElementById("custoTotal");


  // Create a new table row
  const table = document.getElementById("foodTable");
  const newRow = table.insertRow(1);

  if ((ingredients, marketWeight, marketPrice, grossWeight === "" || typeFood === "0")) {
    alert("Preencha os dados corretamente.");
  } else {
    let costReal = (preço, embalagem, uso) => (preço / embalagem) * uso;
    // Add cells to the new row
    const cell1 = newRow.insertCell(0);
    cell1.innerHTML = ingredients;

    const cell2 = newRow.insertCell(1);
    cell2.innerHTML = typeFood === "1" ? `${marketWeight} g` : `${marketWeight} L`;
    

    const cell3 = newRow.insertCell(2);
    cell3.innerHTML = `R$ ${marketPrice.toFixed(2)}`;

    const cell4 = newRow.insertCell(3);
    cell4.innerHTML = typeFood === "1" ? `${grossWeight} g` : `${grossWeight} L`;

    const cell5 = newRow.insertCell(4);
    const costUni = costReal(marketPrice, marketWeight, grossWeight);
    total += costUni;
    cell5.innerHTML = `R$ ${costUni.toFixed(2)}`;

    trCustoTotal.style.opacity = 1;
    //trCustoPorcao.style.opacity = 1;
    result.innerHTML = `R$ ${total.toFixed(2)}`;
  }
  // Clear value inputs and focus
}

function changeTable() {
  const typeFood = document.getElementById("typeFood").value;
  const embalagem = document.getElementById("embalagem");
  const uso = document.getElementById("usoReceita");
  if (typeFood === "1") {
    embalagem.innerHTML = "Tamanho da embalagem (Gramas)";
    uso.innerHTML = "Uso na receita (Gramas)";
  } else if (typeFood === "2") {
    embalagem.innerHTML = "Tamanho da embalagem (Litros)";
    uso.innerHTML = "Uso na receita (Litros)";
  }
}

/*function CostPor(){
  const porcao = Number(document.getElementById("porcao").value);
  const resultPor = document.getElementById("custoPorcao");

  resultPor.innerHTML = total / porcao;
}*/
