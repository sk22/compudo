import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { SectionHeading } from '../components/heading'
import DisqusDiscussion from '../components/disqus-discussion'
import { NoPrint } from '../components/print'

const CommentsHeading = styled(SectionHeading)`
  margin-top: 4rem;
`

const Page = ({ title, children, showDiscussion = true }) => {
  document.title = `${title || ''}${title ? ' – ' : ''}compudo`
  return (
    <Fragment>
      {children}
      {showDiscussion && (
        <NoPrint>
          <CommentsHeading>Diskussion</CommentsHeading>
          <DisqusDiscussion shortname="compudo" config={{ title }} />
        </NoPrint>
      )}
    </Fragment>
  )
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  showDiscussion: PropTypes.bool
}

export default Page
