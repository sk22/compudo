import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { render } from 'react-dom'
import { parse } from 'url'
import styled from 'styled-components'
import marked from 'marked'

import Guide from '../components/guide'
import Site from '../components/site'
import Loading from '../components/loading'
import Error from '../components/error'
import Link, { linkCss } from '../components/link'
import { listItemCss } from '../components/list'
import {
  headingCss,
  subheadingCss,
  TitleHeading
} from '../components/heading'
import Page from '../layouts/page'
import client from '../cms'

const Article = styled.article`
  & a {
    ${linkCss};
  }

  & li {
    ${listItemCss};
  }

  & h1 {
    ${headingCss};
  }

  & h2 {
    ${subheadingCss};
  }
`

function createContextProvider(context) {
  class ContextProvider extends React.Component {
    getChildContext() {
      return context
    }

    render = () => this.props.children

    static propTypes = { children: PropTypes.node }
  }

  ContextProvider.childContextTypes = {}
  Object.keys(context).forEach(key => {
    ContextProvider.childContextTypes[key] = PropTypes.any.isRequired
  })

  return ContextProvider
}

class Content extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({ slug: PropTypes.string })
    }),
    showDiscussion: PropTypes.bool
  }

  static contextTypes = {
    router: PropTypes.any
  }

  state = {
    ok: true,
    entry: null
  }

  prepare = ref => {
    if (!ref) return
    const Provider = createContextProvider(this.context)

    Array.from(ref.querySelectorAll('a'))
      .filter(link => /compudo.*/.test(parse(link.href).hostname))
      .forEach(link => {
        const span = document.createElement('span')
        const { pathname, protocol } = parse(link.href)
        const text = parse(link.innerText).protocol
          ? `${protocol}//${window.location.hostname}/${pathname.slice(1)}`
          : link.innerText

        link.parentNode.replaceChild(span, link)
        render(
          <Provider>
            <Link to={pathname}>{text}</Link>
          </Provider>,
          span
        )
      })
  }

  async update(slug) {
    this.setState({ entry: null })
    const guide = await client.getEntries({
      content_type: 'guide',
      'fields.slug': slug
    })
    if (guide.items.length) {
      this.setState({ entry: guide.items[0] })
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

  componentWillReceiveProps = props => {
    if (props.match.params.slug !== this.props.match.params.slug) {
      this.update(props.match.params.slug)
    }
  }

  getElement() {
    if (!this.state.entry) return
    const children = (
      <Article
        innerRef={this.prepare}
        dangerouslySetInnerHTML={{
          __html: marked(this.state.entry.fields.text || '')
        }}
      />
    )

    switch (this.state.entry.sys.contentType.sys.id) {
      case 'guide':
        const { tags, authors } = this.state.entry.fields
        return (
          <Guide tags={tags} authors={authors}>
            {children}
          </Guide>
        )
      case 'site':
        return <Site>{children}</Site>
      default:
        return null
    }
  }

  render = () => {
    const element = this.getElement()
    return element ? (
      <Page
        title={this.state.entry && this.state.entry.fields.title}
        showDiscussion={this.props.showDiscussion}
      >
        <TitleHeading>{this.state.entry.fields.title}</TitleHeading>
        {element}
      </Page>
    ) : this.state.ok ? (
      <Loading />
    ) : (
      <Error message="Die gewünschte Seite wurde nicht gefunden." />
    )
  }
}

export default Content
