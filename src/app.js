import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Shell from './layouts/shell'
import Home from './views/home'
import Guides from './views/guides'
import GuidesByAuthor from './views/guides-by-author'
import GuidesByTag from './views/guides-by-tag'
import GuideOrSite from './views/guide-or-site'

class App extends Component {
  render = () => (
    <Router>
      <Shell>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/guides/@:author" component={GuidesByAuthor} />
          <Route path="/guides/:tag" component={GuidesByTag} />
          <Route path="/guides" component={Guides} />
          <Route path="/:slug" component={GuideOrSite} />
        </Switch>
      </Shell>
    </Router>
  )
}

export default App
