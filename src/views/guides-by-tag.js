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
    const tag = await client.getEntries({
      content_type: 'tag',
      'fields.slug': slug
    })

    if (tag.items.length) {
      const guides = await client.getEntries({
        content_type: 'guide',
        'fields.tags.sys.id[in]': tag.items[0].sys.id
      })
      this.setState({ guides: guides.items, name: tag.items[0].fields.name })
    } else {
      this.setState({ guides: [], name: slug })
    }
  }

  render = () => (
    <Page>
      {this.state.guides ? (
        <Fragment>
          <Heading>Erklärungen über {this.state.name}</Heading>
          <GuidesList guides={this.state.guides} />
        </Fragment>
      ) : (
        <Loading />
      )}
    </Page>
  )
}

export default GuidesByTag
