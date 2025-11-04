import {app, BrowserWindow, ipcMain} from 'electron'
import * as path from 'path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const criarJanela = () => { //JANELA PRINCIPAL
    const janela = new BrowserWindow({
        fullscreen: false,
        webPreferences:{
            nodeIntegration: false,
            contextIsolation: true,
            devTools: true,
            sandbox: false,
            preload: path.join(__dirname, 'preload.js'),
        }
    })
   
    janela.setMenu(null);
    janela.webContents.openDevTools()
    janela.loadFile(path.join(__dirname,'../app/index.html'))
}
const janelaHistorico = () => { //JANELA DO HISTÓRICO
    const janela = new BrowserWindow({
        width: 300, height: 300,
        webPreferences:{
            nodeIntegration: false,
            contextIsolation: true,
            devTools: false,
            sandbox: false,
            preload: path.join(__dirname, 'preload.js'),
        }
    })
   
    janela.setMenu(null);
    janela.webContents.openDevTools()
    janela.loadFile(path.join(__dirname,'../app/histórico.html'))
}




app.whenReady().then(criarJanela)

let historico = []
ipcMain.on('montarHistorico', (event, caixa) => {
    let resultado = eval(caixa)
    if(Number.isInteger(resultado)){resultado = Number(resultado).toFixed(0)}
    else{resultado = Number(resultado).toFixed(2)}
    let expressao = []
    expressao.push(caixa + ' = ' + resultado)
    historico.push(expressao)
    console.log(historico)
})

ipcMain.on('janela-historico', janelaHistorico)
ipcMain.on('solicitar-historico', (event) => event.reply('devolver-historico', historico))
