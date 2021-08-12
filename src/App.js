import './css/App.css';
import React from 'react';
import Routes from './routes'

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  render() {
    return (
        <div className="App">
            <Routes />
        </div>
    );
  }

}

export default App;
