
import './App.css';
import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import Newscomp from './Components/Newscomp';
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  pagesize = 12;
  state = { progress: 0 }
  setProgress = (progress) => {
    this.setState({ progress: progress })
  }
  apiKey = process.env.REACT_APP_NEWS_API;
  render() {
    return (
      <>
        <Router>
          <div>
            <Navbar />
            <LoadingBar
              height={3}
              color='#f11946'
              progress={this.state.progress}

            />
            <Routes>
              <Route exact path='/' element={<Newscomp apiKey={this.apiKey} setProgress={this.setProgress} key="general" pagesize={this.pagesize} country="in" category="general" />} />
              <Route exact path='/business' element={<Newscomp apiKey={this.apiKey} setProgress={this.setProgress} key="business" pagesize={this.pagesize} country="in" category="business" />} />
              <Route exact path='/entertainment' element={<Newscomp apiKey={this.apiKey} setProgress={this.setProgress} key="entertainment" pagesize={this.pagesize} country="in" category="entertainment" />} />
              <Route exact path='/general' element={<Newscomp apiKey={this.apiKey} setProgress={this.setProgress} key="general" pagesize={this.pagesize} country="in" category="general" />} />
              <Route exact path='/health' element={<Newscomp apiKey={this.apiKey} setProgress={this.setProgress} key="health" pagesize={this.pagesize} country="in" category="health" />} />
              <Route exact path='/science' element={<Newscomp apiKey={this.apiKey} setProgress={this.setProgress} key="science" pagesize={this.pagesize} country="in" category="science" />} />
              <Route exact path='/sports' element={<Newscomp apiKey={this.apiKey} setProgress={this.setProgress} key="sports" pagesize={this.pagesize} country="in" category="sports" />} />
              <Route exact path='/technology' element={<Newscomp apiKey={this.apiKey} setProgress={this.setProgress} key="technology" pagesize={this.pagesize} country="in" category="technology" />} />
            </Routes>
          </div>
        </Router>
      </>
    )
  }
}

