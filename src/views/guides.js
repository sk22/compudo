import React, { Component, Fragment } from 'react'
import client from '../cms'
import Page from '../layouts/page'
import Loading from '../components/loading'
import GuidesList from '../components/guides-list'
import { Heading } from '../components/heading'

class Guides extends Component {
  state = {
    guides: null
  }

  componentDidMount() {
    this.updateGuides()
  }

  async updateGuides() {
    const guides = await client.getEntries({
      content_type: 'guide'
    })
    this.setState({ guides: guides.items })
  }

  render = () => (
    <Page>
      {this.state.guides ? (
        <Fragment>
          <Heading>Erklärungen</Heading>
          <GuidesList guides={this.state.guides} />
        </Fragment>
      ) : (
        <Loading />
      )}
    </Page>
  )
}

export default Guides
