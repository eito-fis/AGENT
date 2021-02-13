import React from 'react';
import Home from './Home';
import EnvAgentTab from './components/EnvAgentTab'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/envagent' exact component={EnvAgentTab} />
        </Switch>
      </Router>
    </>
  );
}

export default App;