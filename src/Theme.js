import { createTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

const theme = createTheme({
    palette: {
        primary: {
            main: '#4F46E5',
        },
        secondary: {
            main: green[500],
        },
    },
});

export default theme;