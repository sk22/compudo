import React, { Component } from 'react'
import styled from 'styled-components'
import SearchBar from './search-bar'
import client from '../cms'
import { SectionHeading } from './heading'
import Link from './link'

export const SidebarSection = styled.section`
  * + & {
    margin-top: 1.5rem;
  }
`

const Nav = styled.nav`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  width: 20rem;

  @media screen and (max-width: 767px) {
    width: 100%;
  }
`

class Sidebar extends Component {
  state = {
    tags: null
  }

  async componentDidMount() {
    const tags = await client.getEntries({ content_type: 'tag' })
    this.setState({ tags })
  }

  render = () => (
    <Nav>
      <SearchBar />
      {this.state.tags ? (
        <SidebarSection>
          <SectionHeading>Erklärungen</SectionHeading>
          <ul>
            {this.state.tags.items.map(item => (
              <li key={item.fields.slug}>
                <Link to={`/guides/${item.fields.slug}`}>
                  {item.fields.name}
                </Link>
              </li>
            ))}
          </ul>
        </SidebarSection>
      ) : (
        <p>Es wird geladen...</p>
      )}
    </Nav>
  )
}

export default Sidebar
