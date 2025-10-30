# Calculadora Desktop com Electron

Este é um projeto de uma calculadora desktop funcional construída com **Electron**. O foco principal da aplicação é demonstrar uma arquitetura segura e moderna, utilizando as melhores práticas do Electron para comunicação entre a interface (processo de renderização) e a lógica de backend (processo principal), garantindo que operações sensíveis sejam executadas de forma isolada.

## Tecnologias Utilizadas

* **Electron**: Framework principal para a construção da aplicação desktop.
* **JavaScript (ES6+)**: Utilizado para toda a lógica da aplicação, tanto no frontend (renderer) quanto no script de preload.
* **HTML5**: Responsável pela estruturação da interface da calculadora.
* **Electronmon**: Usado no desenvolvimento para hot-reload da aplicação.
* **Node.js (via Preload)**: Utilizado para a execução da lógica de cálculo.
* **CSS**: Utilizado para a estilização da interface.

## Arquitetura e Lógica do Projeto

A arquitetura desta aplicação segue o modelo de segurança recomendado pelo Electron, separando os processos e contextos:

### 1. Processo de Renderização (Renderer Process)

* **HTML (`app/index.html`):** Define a estrutura da calculadora, incluindo o "display" (um `<input>` com id `caixa`) e todos os botões, organizados em um `div` com id `teclado`.
* **JavaScript (`app/renderer.js`):** Este script é responsável por toda a interação do usuário.
    * Ele adiciona um único *event listener* ao `teclado`, capturando os cliques em qualquer botão.
    * Ele constrói a string da operação matemática no display (a `caixa`) com base nos botões clicados [cite: uploaded
