import React from 'react'
import PropTypes from 'prop-types'
import Container from '../components/container'

const Base = ({ title = 'compudo', children }) => {
  document.title = title
  return <Container>{children}</Container>
}

Base.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default Base
