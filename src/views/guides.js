import React, { Component } from 'react'
import client from '../cms'
import Page from '../layouts/page'
import Loading from '../components/loading'
import GuidesList from '../components/guides-list'
import { TitleHeading } from '../components/heading'

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
        <TitleHeading>Alle Erklärungen</TitleHeading>
        <GuidesList guides={this.state.guides} />
      </Page>
    ) : (
      <Loading />
    )
}

export default Guides
