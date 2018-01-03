import React, { Fragment } from 'react'
import styled from 'styled-components'
import Link from './link'

const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
`

const GuideItem = styled.li`
  margin-bottom: 1rem;
`

const Meta = styled.span`
  margin-right: 0.5rem;
`

const GuidesList = ({ guides }) => (
  <StyledList>
    {guides.map(g => (
      <GuideItem key={g.fields.slug}>
        <Link to={`/${g.fields.slug}`}>{g.fields.title}</Link>
        <br />
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
                  key={g.fields.username}
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

export default GuidesList
