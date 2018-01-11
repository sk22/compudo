import React, { Component } from 'react'
import PropTypes from 'prop-types'
import client from '../cms'
import Page from '../layouts/page'
import Loading from '../components/loading'
import GuidesList from '../components/guides-list'
import { TitleHeading } from '../components/heading'

class GuidesByAuthor extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({ author: PropTypes.string })
    })
  }

  state = {
    guides: null,
    name: null
  }

  componentWillReceiveProps(props) {
    this.updateGuides(props.match.params.author)
  }

  componentDidMount() {
    this.updateGuides(this.props.match.params.author)
  }

  async updateGuides(username) {
    const author = await client.getEntries({
      content_type: 'author',
      'fields.username': username
    })

    if (author.items.length) {
      const guides = await client.getEntries({
        content_type: 'guide',
        'fields.authors.sys.id[in]': author.items[0].sys.id
      })
      this.setState({ guides: guides.items, name: author.items[0].fields.name })
    } else {
      this.setState({ guides: [], name: username })
    }
  }

  render = () =>
    this.state.guides ? (
      <Page title={this.state.name}>
        <TitleHeading>Erklärungen von {this.state.name}</TitleHeading>
        <GuidesList guides={this.state.guides} />
      </Page>
    ) : (
      <Loading />
    )
}

export default GuidesByAuthor
