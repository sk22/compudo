import PropTypes from 'prop-types'

const Page = ({ title, children }) => {
  document.title = `${title || ''}${title ? ' - ' : ''}compudo`
  return children
}

Page.propTypes = {
  children: PropTypes.node.isRequired
}

export default Page
