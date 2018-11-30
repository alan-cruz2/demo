import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

// Routes Components
import Scroll from './routes/scroll';
import Layout from './Layout';

// First do route matching, then default route
const routes = [
  <Route path='/scroll' component={Scroll}/>,
  <Route component={Scroll}/>
];

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Layout>
            {routes}
          </Layout>
        </Switch>
      </div>
    );
  }
}

export default App;
