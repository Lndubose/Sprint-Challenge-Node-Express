import React, { Component } from 'react';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';
import './App.css';

import ProjectList from './components/ProjectList';
import ViewProject from './components/ViewProject';

class App extends Component {
  state = {
    projects: [],
  }

  componentDidMount() {
    axios.get('http://localhost:7013/projects')
      .then(response => this.setState({ projects: response.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <h1>Project time!</h1>
        <Link to="/">Home</Link>

        <Route exact path="/" render={props => <ProjectList {...props} projects={this.state.projects} />} />
        <Route path="/projects/:projectId" render={props => <ViewProject {...props} projects={this.state.projects} />} />
      </div>
    );
  }
}

export default App;
