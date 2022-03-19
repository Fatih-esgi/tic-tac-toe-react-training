import React from 'react';

import './App.css';
import GameZone from './Game/GameZone';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Tic Tac Toe</h1>
      </header>
      <main>
        <GameZone />
      </main>
    </div>
  );
}

export default App;
