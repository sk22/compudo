import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Page from '../layouts/page'
import Guide from './guide'
import Site from './site'
import Loading from '../components/loading'
import Error from '../components/error'
import client from '../cms'

class GuideOrSite extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({ slug: PropTypes.string })
    })
  }

  state = {
    ok: true,
    entry: null
  }

  async update(slug) {
    this.setState({ entry: null })
    const guide = await client.getEntries({
      content_type: 'guide',
      'fields.slug': slug
    })
    if (guide.items.length) {
      this.setState({ entry: guide.items[0] })
      console.log(guide.items[0])
      return
    }
    const site = await client.getEntries({
      content_type: 'site',
      'fields.slug': slug
    })
    if (site.items.length) {
      this.setState({ entry: site.items[0] })
      return
    }
    this.setState({ ok: false })
  }

  componentDidMount = () => this.update(this.props.match.params.slug)

  componentWillReceiveProps = props => this.update(props.match.params.slug)

  render = () =>
    this.state.entry ? (
      this.state.entry.sys.contentType.sys.id === 'guide' ? (
        <Guide guide={this.state.entry} />
      ) : (
        <Site site={this.state.entry} />
      )
    ) : this.state.ok ? (
      <Loading />
    ) : (
      <Error message="Die gewünschte Seite wurde nicht gefunden." />
    )
}

export default GuideOrSite
