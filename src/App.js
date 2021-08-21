import React from 'react';
import Routes from './Routes'
import theme from './Theme'
import {ThemeProvider} from "@material-ui/core";

export default function App() {

    return (
        <ThemeProvider theme={theme}>
            <Routes/>
        </ThemeProvider>
    );


}
