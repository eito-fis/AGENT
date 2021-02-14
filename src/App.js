import React from 'react';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import OtherRoutes from './components/OtherRoutes';

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/' exact component={Home} />
          <OtherRoutes />
        </Switch>
      </Router>
    </>
  );
};

export default App;