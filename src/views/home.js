import React from 'react'

import GuideOrSite from './guide-or-site'

const Home = props => <GuideOrSite match={{ params: { slug: 'home' } }} />

export default Home
