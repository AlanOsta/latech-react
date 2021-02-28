import React from 'react';
import Categorias from './components/categorias/Categorias';
import Calendario from './components/calendario/Calendario';

class App extends React.Component {

  render() {
    return (
      <div id="App">
        <Categorias />
        <Calendario />
      </div>
    );
  };
};

export default App;
