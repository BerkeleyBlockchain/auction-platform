import React, { Component } from 'react';
import logo from './assets/img/Airbus-PNG-Picture.png';
import './assets/css/App.css';
import _ from 'lodash';
import './assets/css/aispec.ttf';
import FormContainer from './containers/FormContainer';
import BidTable from './containers/BidTable';
import ContractTable from './containers/ContractTable';

class App extends Component {
  render () {
    return (
      <div className="App">

        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      
        <div className="Aligner">
          <div className="left">
            <div className="formLeft">
              <FormContainer  />
            </div>
          </div>

        <div className="right">
          <div className="formRight">
            <style>{"table{border: 3px solid #ccc; padding: 0 20px 25px 20px; border-radius: 10px;}"}</style>
              <div className="table">
                <ContractTable  />
             </div>
            </div>
          </div>

        </div>
        </div>
    );
  }
}

export default App;