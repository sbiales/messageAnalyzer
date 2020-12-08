import React, { Component } from "react";
import FileUploadPage from './components/FileUploadPage';
import Header from './components/Header';
//import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
      return (
      <div className="App">
        <header className="App-header">
          <Header />
          <FileUploadPage />
        </header>
      </div>
    );
  }
}

export default App;
