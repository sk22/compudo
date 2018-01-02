import React from 'react'
import Link from './link'

const GuidesList = ({ guides }) => (
  <ul>
    {guides.map(g => (
      <li key={g.fields.slug}>
        <Link to={`/${g.fields.slug}`}>{g.fields.title}</Link>
      </li>
    ))}
  </ul>
)

export default GuidesList
