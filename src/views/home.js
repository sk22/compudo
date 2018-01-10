import React from 'react'

import Content from './content'

const Home = props => (
  <Content showDiscussion={false} match={{ params: { slug: 'home' } }} />
)

export default Home
