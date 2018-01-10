import React, { Component } from 'react'
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
    guides: null,
    name: null
  }

  componentWillReceiveProps(props) {
    this.updateGuides(props.match.params.tag)
  }

  componentDidMount() {
    this.updateGuides(this.props.match.params.tag)
  }

  async updateGuides(slug) {
    this.setState({ guides: null })
    const tags = await client.getEntries({
      content_type: 'tag',
      'fields.slug': slug
    })

    if (tags.items.length) {
      const guides = await client.getEntries({
        content_type: 'guide',
        'fields.tags.sys.id[in]': tags.items[0].sys.id
      })
      this.setState({ guides: guides.items, tag: tags.items[0] })
    } else {
      this.setState({ guides: [], name: slug })
    }
  }

  render = () =>
    this.state.guides ? (
      <Page>
        <Heading>Erklärungen über {this.state.tag.fields.name}</Heading>
        <p>{this.state.tag.fields.description}</p>
        <GuidesList guides={this.state.guides} />
      </Page>
    ) : (
      <Loading />
    )
}

export default GuidesByTag
