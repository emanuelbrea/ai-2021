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

        <div className="App">
            <ThemeProvider theme={theme}>
            <Routes />
        </ThemeProvider>
        </div>
    );
  }

}

export default App;
