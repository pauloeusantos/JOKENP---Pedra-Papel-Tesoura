import React, { useState } from 'react';
import { FaRegFileAlt, FaCut } from 'react-icons/fa';
import { GiStoneBlock } from "react-icons/gi";
import './App.css';

const opcoes = [
  { name: 'Pedra', icon: <GiStoneBlock size={60} /> },
  { name: 'Papel', icon: <FaRegFileAlt size={60} /> },
  { name: 'Tesoura', icon: <FaCut size={60} /> },
];

const App = () => {
  const [mostrarRegrasModal, setMostrarRegrasModal] = useState(true);
  const [mostrarResultadoModal, setMostrarResultadoModal] = useState(false);
  const [escolhaJogador, setEscolhaJogador] = useState('');
  const [escolhaComputador, setEscolhaComputador] = useState('');
  const [vitoriasJogador, setVitoriasJogador] = useState(0);
  const [vitoriasComputador, setVitoriasComputador] = useState(0);
  const [empates, setEmpates] = useState(0);
  const [resultado, setResultado] = useState('');

  const alternarRegrasModal = () => setMostrarRegrasModal(!mostrarRegrasModal);
  const alternarResultadoModal = () => setMostrarResultadoModal(!mostrarResultadoModal);

  const obterEscolhaAleatoria = () => opcoes[Math.floor(Math.random() * opcoes.length)].name;

  const determinarVencedor = (jogador, computador) => {
    if (jogador === computador) {
      setEmpates(empates + 1);
      setResultado('Empate');
    } else if (
      (jogador === 'Pedra' && computador === 'Tesoura') ||
      (jogador === 'Tesoura' && computador === 'Papel') ||
      (jogador === 'Papel' && computador === 'Pedra')
    ) {
      setVitoriasJogador(vitoriasJogador + 1);
      setResultado('Você venceu!');
    } else {
      setVitoriasComputador(vitoriasComputador + 1);
      setResultado('Você perdeu!');
    }
    setMostrarResultadoModal(true);
  };

  const lidarComEscolhaJogador = (escolha) => {
    const escolhaComputador = obterEscolhaAleatoria();
    setEscolhaJogador(escolha);
    setEscolhaComputador(escolhaComputador);
    determinarVencedor(escolha, escolhaComputador);
  };

  const reiniciarJogo = () => {
    setEscolhaJogador('');
    setEscolhaComputador('');
    setResultado('');
    setMostrarResultadoModal(false);
  };

  return (
    <div className="App">
      {mostrarRegrasModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Regras do Jogo</h2>
            <p>Pedra empata com Pedra e ganha de Tesoura</p>
            <p>Tesoura empata com Tesoura e ganha de Papel</p>
            <p>Papel empata com Papel e ganha de Pedra</p>
            <button onClick={alternarRegrasModal}>Entendi</button>
          </div>
        </div>
      )}
      {mostrarResultadoModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Resultado</h2>
            <p>Você escolheu: {escolhaJogador}</p>
            <p>Computador escolheu: {escolhaComputador}</p>
            <h3>{resultado}</h3>
            <button onClick={reiniciarJogo}>Jogar Novamente</button>
          </div>
        </div>
      )}
      <h1>Pedra, Papel, Tesoura</h1>
      <div className="opcoes">
        {opcoes.map(opcao => (
          <button key={opcao.name} onClick={() => lidarComEscolhaJogador(opcao.name)} className="opcao-button">
            {opcao.icon}
            <span>{opcao.name}</span>
          </button>
        ))}
      </div>
      <div className="placar">
        <h2>Placar</h2>
        <p>Jogador: {vitoriasJogador}</p>
        <p>Computador: {vitoriasComputador}</p>
        <p>Empates: {empates}</p>
      </div>
    </div>
  );
}

export default App;
