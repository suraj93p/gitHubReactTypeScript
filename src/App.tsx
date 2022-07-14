import React from 'react';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from 'styled-components';
import { guidelineColors } from './theme';
import AppRouter from './app.router';
import FooterComponent from './components/footer/footer.component';

const getTheme = () => guidelineColors;

const App = () => (
    <ThemeProvider theme={getTheme()}>
        <Helmet>
            <meta charSet="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Github Search and View</title>
        </Helmet>
        <AppRouter />
        <FooterComponent />
    </ThemeProvider>
);

export default App;
