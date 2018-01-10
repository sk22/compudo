import React, { Component } from 'react'
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
    this.setState({ guides: null })
    const guides = await client.getEntries({
      content_type: 'guide'
    })
    this.setState({ guides: guides.items })
  }

  render = () =>
    this.state.guides ? (
      <Page title="Alle Erklärungen">
        <Heading>Erklärungen</Heading>
        <GuidesList guides={this.state.guides} />
      </Page>
    ) : (
      <Loading />
    )
}

export default Guides
