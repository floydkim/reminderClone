import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-4">
            <div className="row">Search</div>
            <div className="row">Groups</div>
          </div>
          <div className="col-8">TodoList</div>
        </div>
      </div>
    );
  }
}

export default App;
