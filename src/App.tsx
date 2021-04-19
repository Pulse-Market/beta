import React, { ReactElement } from 'react';

import { Route, Switch } from 'react-router';

import { routes } from './routes';

function App(): ReactElement {
    return (
        <Switch>
            {routes.map((route): ReactElement => <Route {...route} key={route.key} />)}
        </Switch>
    );
};

export default App;
