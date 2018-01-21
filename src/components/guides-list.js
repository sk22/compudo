import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from './link'

const StyledList = styled.ul``

const GuideItem = styled.li`
  margin-bottom: 1rem;
`

const Meta = styled.span`
  display: inline-block;
  margin-right: 0.5rem;
`

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: normal;
  margin-bottom: 0.5rem;
`

const GuidesList = ({ guides }) => (
  <StyledList>
    {guides.map(g => (
      <GuideItem key={g.fields.slug}>
        <Title>
          <Link to={`/${g.fields.slug}`}>{g.fields.title}</Link>
        </Title>
        {g.fields.tags && (
          <Meta>
            {'über '}
            {g.fields.tags &&
              g.fields.tags
                .map(a => (
                  <Link key={a.fields.slug} to={`/guides/${a.fields.slug}`}>
                    {a.fields.name}
                  </Link>
                ))
                .reduce((prev, curr) => [prev, ', ', curr])}
          </Meta>
        )}
        {g.fields.authors && (
          <Meta>
            {'von '}
            {g.fields.authors
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
      </GuideItem>
    ))}
  </StyledList>
)

GuidesList.propTypes = {
  guides: PropTypes.arrayOf(
    PropTypes.shape({
      fields: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(
          PropTypes.shape({
            fields: PropTypes.shape({
              slug: PropTypes.string,
              name: PropTypes.string
            })
          })
        ),
        authors: PropTypes.arrayOf(
          PropTypes.shape({
            fields: PropTypes.shape({
              username: PropTypes.string,
              name: PropTypes.string
            })
          })
        )
      })
    })
  )
}

export default GuidesList
