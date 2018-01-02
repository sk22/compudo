import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import marked from 'marked'
import Page from '../layouts/page'
import Loading from '../components/loading'
import client from '../cms'
import { Heading } from '../components/heading'

class Guide extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({ slug: PropTypes.string })
    })
  }

  state = {
    ok: true,
    guide: null,
    text: null
  }

  async componentDidMount() {
    const result = await client.getEntries({
      content_type: 'guide',
      'fields.slug': this.props.match.params.slug
    })
    if (!result.items.length) {
      this.setState({ ok: false })
    }
    const { text, title } = result.items[0].fields
    this.setState({ text, title })
  }

  render() {
    return (
      <Page>
        {this.state.text ? (
          <Fragment>
            <Heading>{this.state.title}</Heading>
            <article
              dangerouslySetInnerHTML={{ __html: marked(this.state.text) }}
            />
          </Fragment>
        ) : (
          <Loading />
        )}
      </Page>
    )
  }
}

export default Guide
