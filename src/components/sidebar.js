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
  flex-direction: column;
  width: 20rem;

  @media screen and (max-width: 767px) {
    width: 100%;
  }
`

class Sidebar extends Component {
  state = {
    application: null
  }

  async componentDidMount() {
    const application = await client.getEntries({ content_type: 'application' })
    console.log(application)
    this.setState({ application })
  }

  render = () => (
    <Nav>
      <SearchBar />
      {this.state.application ? (
        <SidebarSection>
          <SectionHeading>Erklärungen</SectionHeading>
          <ul>
            {this.state.application.items.map(item => (
              <li key={item.fields.slug}>
                <Link to={`/guides/${item.fields.slug}`}>{item.fields.name}</Link>
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
