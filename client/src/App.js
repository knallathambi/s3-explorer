import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ObjectList from './components/ObjectList';
import NavPath from './components/NavPath';
import {S3Provider, S3Consumer} from './context/S3Context';

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-light">
          <span className="navbar-brand mb-0 h1">S3 Explorer</span>
        </nav>    
        <Router>
        <div className="container-fluid">
          <S3Provider>
            <S3Consumer>
              { ({ bucketName }) => <NavPath bucketName={bucketName} selectedKey={'root/run.py'} />}
            </S3Consumer>
            <Route exact path="/" component={ObjectList} />            
          </S3Provider>          
        </div>
        </Router>    
      </div>
    );
  }
}

export default App;
