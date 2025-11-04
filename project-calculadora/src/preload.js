import { contextBridge, ipcRenderer} from "electron"

let resultado
contextBridge.exposeInMainWorld('api',{
    name: 'calculator',
    operar: (entrada) => resultado = eval(entrada),
    resolucao: () => resultado.toFixed(2),
    montarHistorico: (caixa) => ipcRenderer.send('montarHistorico', caixa),
    receberHistorico: (historico) => ipcRenderer.on('historico-pronto', historico),
    janelaHistorico: () => ipcRenderer.send('janela-historico')
})