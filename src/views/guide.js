import React, { Component } from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import marked from 'marked'
import styled from 'styled-components'
import Link, { linkCSS } from '../components/link'
import { parse } from 'url'

import Page from '../layouts/page'
import { Heading } from '../components/heading'

const Meta = styled.div`
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  font-weight: 500;
  font-size: 1rem;
  margin-bottom: 0.3rem;
`

const Article = styled.article`
  & a {
    ${linkCSS};
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

class Guide extends Component {
  static propTypes = {
    guide: PropTypes.shape({
      fields: PropTypes.shape({
        tags: PropTypes.arrayOf(
          PropTypes.shape({
            fields: PropTypes.shape({
              slug: PropTypes.string,
              name: PropTypes.string
            })
          })
        ),
        text: PropTypes.string,
        title: PropTypes.string,
        authors: PropTypes.arrayOf(
          PropTypes.shape({
            fields: PropTypes.shape({
              name: PropTypes.string,
              username: PropTypes.string
            })
          })
        )
      })
    }),
    showDiscussion: PropTypes.bool
  }

  prepare(ref, context) {
    const Provider = createContextProvider(this.context)

    Array.from(ref.querySelectorAll('a'))
      .filter(link => /compudo.*/.test(parse(link.href).hostname))
      .forEach(link => {
        const span = document.createElement('span')
        const { pathname } = parse(link.href)
        const text = parse(link.innerText).protocol
          ? `${window.location.hostname}/${pathname.slice(1)}`
          : link.innerText

        link.parentNode.replaceChild(span, link)
        render(
          <Provider>
            <Link to={pathname}>{text}</Link>
          </Provider>,
          span
        )
        console.log(span, link)
      })
  }

  static contextTypes = {
    router: PropTypes.any
  }

  render = () => (
    <Page
      title={this.props.guide.fields.title}
      showDiscussion={this.props.showDiscussion}
    >
      <Heading>{this.props.guide.fields.title}</Heading>
      {this.props.guide.fields.authors && (
        <Meta>
          Autor{this.props.guide.fields.authors.length > 1 && 'en'}:{' '}
          {this.props.guide.fields.authors
            .map(a => (
              <Link
                key={a.fields.username}
                to={`/guides/@${a.fields.username}`}
              >
                {a.fields.name}
              </Link>
            ))
            .reduce((prev, curr) => [prev, ', ', curr])}
        </Meta>
      )}
      {this.props.guide.fields.tags && (
        <Meta>
          Über:{' '}
          {this.props.guide.fields.tags
            .map(t => (
              <Link key={t.fields.slug} to={`/guides/${t.fields.slug}`}>
                {t.fields.name}
              </Link>
            ))
            .reduce((prev, curr) => [prev, ', ', curr])}
        </Meta>
      )}
      <Article
        innerRef={ref => ref && this.prepare(ref)}
        dangerouslySetInnerHTML={{
          __html: marked(this.props.guide.fields.text || '')
        }}
      />
    </Page>
  )
}

export default Guide
