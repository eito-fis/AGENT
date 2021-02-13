import React from 'react';
import Home from './Home';
import EnvAgentTab from './components/EnvAgentTab'
import ChartTab from './components/ChartTab'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/envagent' exact component={EnvAgentTab} />
          <Route path='/chart' exact component={ChartTab} />
        </Switch>
      </Router>
    </>
  );
}

export default App;