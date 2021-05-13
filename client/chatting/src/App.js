import React, { Component } from 'react';
import ToDo from './pages/ToDo';
import Home from './pages/Home';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
            <header>
              <Link to="/">
              <button>Home</button>
              </Link>
              <Link to="/ToDo">
                <button>Todo</button>
              </Link>
            </header>
            <hr />
            <main>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/ToDo" component={ToDo} />
              </Switch>
            </main>
        </Router>
    );
  }
}

export default App;

