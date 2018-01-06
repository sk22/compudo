import React from 'react'
import PropTypes from 'prop-types'
import marked from 'marked'
import styled from 'styled-components'
import Link, { linkCSS } from '../components/link'

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

const Guide = ({ guide }) => (
  <Page title={guide.fields.title}>
    <Heading>{guide.fields.title}</Heading>
    {guide.fields.authors && (
      <Meta>
        Autor{guide.fields.authors.length > 1 && 'en'}:{' '}
        {guide.fields.authors
          .map(a => (
            <Link key={a.fields.username} to={`/guides/@${a.fields.username}`}>
              {a.fields.name}
            </Link>
          ))
          .reduce((prev, curr) => [prev, ', ', curr])}
      </Meta>
    )}
    {guide.fields.tags && (
      <Meta>
        Über:{' '}
        {guide.fields.tags
          .map(t => (
            <Link key={t.fields.slug} to={`/guides/${t.fields.slug}`}>
              {t.fields.name}
            </Link>
          ))
          .reduce((prev, curr) => [prev, ', ', curr])}
      </Meta>
    )}
    <Article
      dangerouslySetInnerHTML={{ __html: marked(guide.fields.text || '') }}
    />
  </Page>
)

Guide.propTypes = {
  guide: PropTypes.shape({
    text: PropTypes.string,
    authors: PropTypes.arrayOf(
      PropTypes.shape({
        fields: PropTypes.shape({
          name: PropTypes.string,
          username: PropTypes.string
        })
      })
    )
  })
}

export default Guide
