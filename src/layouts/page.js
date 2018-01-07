import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { SectionHeading } from '../components/heading'
import DisqusDiscussion from '../components/disqus-discussion'

const CommentsHeading = styled(SectionHeading)`
  margin-top: 3rem;
`

const Page = ({ title, children }) => {
  document.title = `${title || ''}${title ? ' - ' : ''}compudo`
  return (
    <Fragment>
      {children}
      <CommentsHeading>Kommentare</CommentsHeading>
      <DisqusDiscussion shortname="compudo" config={{ title }} />
    </Fragment>
  )
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string
}

export default Page
