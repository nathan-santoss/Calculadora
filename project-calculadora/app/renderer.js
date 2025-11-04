
const captacao = () => {
    const teclado = document.getElementById('teclado')
    
    teclado.addEventListener('click', (event) => {
        const botao = event.target.textContent;
        let caixa = document.getElementById('caixa').value
        if(botao === 'CE'){document.getElementById('caixa').value = ''} 
        else if(botao.trim() === '='){
            const caixa = document.getElementById('caixa').value
            window.api.operar(caixa)
            window.api.montarHistorico(caixa)
            document.getElementById('caixa').value = window.api.resolucao()
        }
        else if(botao === 'DEL'){
            document.getElementById('caixa').value = document.getElementById('caixa').value.slice(0, -1)}
        else if(botao === 'H'){ montarHistorico() }
        else{document.getElementById('caixa').value += botao}
    })
}
window.addEventListener('load', captacao)

const montarHistorico = () => {
    window.api.janelaHistorico()
    window.api.receberHistorico((event, array) => document.getElementById('historico').innerHTML = array)
}