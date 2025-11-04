import { contextBridge, ipcRenderer} from "electron"

let resultado
contextBridge.exposeInMainWorld('api',{
    name: 'calculator',
    operar: (entrada) => resultado = eval(entrada),
    resolucao: () => resultado.toFixed(2),
    montarHistorico: (caixa) => ipcRenderer.send('montarHistorico', caixa),
    janelaHistorico: () => ipcRenderer.send('janela-historico'),
    
    solicitar: () => ipcRenderer.send('solicitar-historico'),
    receber: (historico) => ipcRenderer.on('devolver-historico', historico)
})
