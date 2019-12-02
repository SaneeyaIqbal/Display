import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Students extends Component {

  render() {
    return (
      <div className="head">
        <h1>Student Details</h1>
        {this.props.firstName}
        {this.props.lastName}
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props); {
      this.state = {
        details: []
      }
    }
  }

  render() {
    return (
      <div className="App">
        <Students firstName='Pramod' lastName='Ray' />
      </div>

    );
  }
}

export default App;
