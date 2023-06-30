function addFood() {
    // Retrieve form input values
    const ingredients = document.getElementById("ingredients").value;
    const marketWeight = document.getElementById("marketWeight").value;
    const marketPrice = document.getElementById("marketPrice").value;
    const grossWeight = document.getElementById("grossWeight").value;
  
    // Create a new table row
    const table = document.getElementById("foodTable");
    const newRow = table.insertRow(-1);
  
    if (ingredients, marketWeight, marketPrice, grossWeight === '') {
        alert("Preencha os dados corretamente.")
    } else {
        let costReal = ((preço, embalagem, uso) => (preço / embalagem)*uso)
        // Add cells to the new row
        const cell1 = newRow.insertCell(0);
        cell1.innerHTML = ingredients;
    
        const cell2 = newRow.insertCell(1);
        cell2.innerHTML = marketWeight;

        const cell3 = newRow.insertCell(2);
        cell3.innerHTML = marketPrice;

        const cell4 = newRow.insertCell(3);
        cell4.innerHTML = grossWeight;
        
        const cell5 = newRow.insertCell(4);
        cell5.innerHTML = costReal(marketPrice, marketWeight, grossWeight);
    }
    // Clear value inputs and focus
    ingredients.innerHTML = ''
    marketWeight.value = ''
    marketPrice.value = ''
    grossWeight.value = ''
    ingredients.focus()
}