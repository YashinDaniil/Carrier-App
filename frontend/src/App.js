import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import RequestPage from './components/requestPage/general'

class App extends React.Component {
  render() {
  return (
      <div>
        <Switch>
          <Route exact={true} path="/" component={RequestPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
