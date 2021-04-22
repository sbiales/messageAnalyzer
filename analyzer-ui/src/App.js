import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import FileUploadPage from "./components/FileUploadPage";
import PrivacyPage from "./components/PrivacyPage";
import HowToPage from "./components/HowToPage";
import Header from './components/Header';
import Results from './components/Results';
//import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
      return (
      <div className="App">
        <BrowserRouter>
          <Header />
          <Route exact path="/" component={FileUploadPage} />
          <Route exact path="/howto" component={HowToPage} />
          <Route exact path="/privacy" component={PrivacyPage} />
          <Route exact path="/results" render={(props) => <Results {...props} />} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
