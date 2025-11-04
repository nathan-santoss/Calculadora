import { contextBridge, ipcRenderer} from "electron"

let resultado
contextBridge.exposeInMainWorld('api',{
    name: 'calculator',
    operar: (entrada) => resultado = eval(entrada),
    resolucao: () => {
        if(Number.isInteger(resultado)){resultado = Number(resultado).toFixed(0)}
        else{resultado = Number(resultado).toFixed(2)}
        return resultado
    },
    montarHistorico: (caixa) => ipcRenderer.send('montarHistorico', caixa),
    janelaHistorico: () => ipcRenderer.send('janela-historico'),

    solicitar: () => ipcRenderer.send('solicitar-historico'),
    receber: (historico) => ipcRenderer.on('devolver-historico', historico)
})
