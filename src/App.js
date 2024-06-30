import NavBar from './components/Navbar';
import React, { Component } from 'react';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  state = {
    progress: 0
  }

  api_key =process.env.REACT_APP_API_KEY 
  
  setProgress = (progress) => {
    this.setState({ progress });
  }

  render() {
    const pageSize = 4;
    const country = 'in';

    return (
      <>
        <Router>
          <NavBar />
          <LoadingBar color="#FF0000" progress={this.state.progress} />
          <Routes>
            <Route path="/" element={<News setProgress={this.setProgress} api_key={this.api_key} key="general" pageSize={pageSize} country={country} category="general" />} />
            <Route path="/business" element={<News setProgress={this.setProgress} api_key={this.api_key} key="business" pageSize={pageSize} country={country} category="business" />} />
            <Route path="/entertainment" element={<News setProgress={this.setProgress} api_key={this.api_key} key="entertainment" pageSize={pageSize} country={country} category="entertainment" />} />
            <Route path="/health" element={<News setProgress={this.setProgress} api_key={this.api_key} key="health" pageSize={pageSize} country={country} category="health" />} />
            <Route path="/science" element={<News setProgress={this.setProgress} api_key={this.api_key} key="science" pageSize={pageSize} country={country} category="science" />} />
            <Route path="/sports" element={<News setProgress={this.setProgress} api_key={this.api_key} key="sports" pageSize={pageSize} country={country} category="sports" />} />
            <Route path="/technology" element={<News setProgress={this.setProgress} api_key={this.api_key} key="technology" pageSize={pageSize} country={country} category="technology" />} />
          </Routes>
        </Router>
      </>
    );
  }
}
