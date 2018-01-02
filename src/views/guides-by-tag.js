import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import client from '../cms'
import Page from '../layouts/page'
import Loading from '../components/loading'
import GuidesList from '../components/guides-list'
import { Heading } from '../components/heading'

class GuidesByTag extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({ tag: PropTypes.string })
    })
  }

  state = {
    guides: null
  }

  componentWillReceiveProps(props) {
    this.updateGuides(props.match.params.tag)
  }

  componentDidMount() {
    this.updateGuides(this.props.match.params.tag)
  }

  async updateGuides(tag) {
    const guides = await client.getEntries({
      content_type: 'guide',
      'fields.tags': tag
    })
    const result = await client.getEntries({
      content_type: 'tag',
      'fields.slug': tag
    })
    const name = result.items.length ? result.items[0].fields.name : tag
    this.setState({ guides: guides.items, name })
  }

  render = () => (
    <Page>
      {this.state.guides ? (
        <Fragment>
          <Heading>Erklärungen für {this.state.name}</Heading>
          <GuidesList guides={this.state.guides} />
        </Fragment>
      ) : (
        <Loading />
      )}
    </Page>
  )
}

export default GuidesByTag
