import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from './pages/home'

class App extends Component {
  render = () => (
    <Router>
      <Route exact path="/" component={Home} />
    </Router>
  )
}

export default App
