import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Link from '../components/link'

const Meta = styled.div`
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  font-weight: 500;
  font-size: 1rem;
  margin-bottom: 0.3rem;
`

const Guide = ({ authors, tags, children }) => (
  <Fragment>
    {authors && (
      <Meta>
        Autor{authors.length > 1 && 'en'}:{' '}
        {authors
          .map(a => (
            <Link key={a.fields.username} to={`/guides/@${a.fields.username}`}>
              {a.fields.name}
            </Link>
          ))
          .reduce((prev, curr) => [prev, ', ', curr])}
      </Meta>
    )}
    {tags && (
      <Meta>
        Über:{' '}
        {tags
          .map(t => (
            <Link key={t.fields.slug} to={`/guides/${t.fields.slug}`}>
              {t.fields.name}
            </Link>
          ))
          .reduce((prev, curr) => [prev, ', ', curr])}
      </Meta>
    )}
    {children}
  </Fragment>
)

Guide.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      fields: { username: PropTypes.string, name: PropTypes.string }
    })
  ),
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      fields: { slug: PropTypes.string, name: PropTypes.string }
    })
  ),
  children: PropTypes.node
}

export default Guide
