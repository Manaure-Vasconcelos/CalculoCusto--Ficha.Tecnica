function somar(){
    const iptEmba = Number(document.querySelector('.txtEmbalagem').value)
    const iptPreco = Number(document.querySelector('.txtPreco').value)
    const iptUso = Number(document.querySelector('.txtUso').value)
    const result = document.querySelector('.result')

    result.value = formatNum((iptPreco / iptEmba) * iptUso)
}

function formatNum(N){
    return N.toFixed(2)
}
