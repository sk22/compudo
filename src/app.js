import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Shell from './layouts/shell'
import Home from './views/home'
import Guides from './views/guides'
import Author from './views/author'
import Tag from './views/tag'
import Content from './views/content'

class App extends Component {
  render = () => (
    <Router>
      <Shell>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/home" render={() => <Redirect to="/" />} />
          <Route path="/guides/@:author" component={Author} />
          <Route path="/guides/:tag" component={Tag} />
          <Route path="/guides" component={Guides} />
          <Route path="/:slug" component={Content} />
        </Switch>
      </Shell>
    </Router>
  )
}

export default App
