import React from 'react'
import PropTypes from 'prop-types'
import marked from 'marked'
import Page from '../layouts/page'
import { Heading } from '../components/heading'

const Site = ({ site, showDiscussion = false }) => (
  <Page showDiscussion={showDiscussion}>
    <Heading>{site.fields.title}</Heading>
    <article
      dangerouslySetInnerHTML={{ __html: marked(site.fields.text || '') }}
    />
  </Page>
)

Site.propTypes = {
  site: PropTypes.shape({
    text: PropTypes.string
  }),
  showDiscussion: PropTypes.bool
}

export default Site
