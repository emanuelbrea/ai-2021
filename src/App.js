import './css/App.css';
import React from 'react';
import Routes from './routes'
import theme from './Theme'
import {ThemeProvider} from "@material-ui/core";

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  render() {
    return (
        <ThemeProvider theme={theme}>
        <div className="App">
            <Routes />
        </div>
        </ThemeProvider>
    );
  }

}

export default App;
