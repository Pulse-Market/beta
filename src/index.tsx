import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { StylesProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import App from './App';
import configureStore from './redux/store';

import './styles/global.module.scss';

const store = configureStore({});
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter basename="/beta">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <StylesProvider injectFirst>
                    <App />
                </StylesProvider>
            </MuiPickersUtilsProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
