import React, { Component, Fragment } from 'react'
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

const Item = styled.li`
  margin-bottom: 0.3rem;
`

class Sidebar extends Component {
  state = {
    tags: null
  }

  async componentDidMount() {
    const tags = await client.getEntries({ content_type: 'tag' })
    const sites = await client.getEntries({ content_type: 'site' })
    this.setState({ tags, sites })
  }

  render = () => (
    <Nav>
      <SearchBar />
      {this.state.tags ? (
        <Fragment>
          <SidebarSection>
            <SectionHeading>Erklärungen</SectionHeading>
            <ul>
              <Item>
                <Link to={`/guides`}>Alle Erklärungen</Link>
              </Item>
              {this.state.tags.items.map(item => (
                <Item key={item.fields.slug}>
                  <Link to={`/guides/${item.fields.slug}`}>
                    {item.fields.name}
                  </Link>
                </Item>
              ))}
            </ul>
          </SidebarSection>
          <SidebarSection>
            <SectionHeading>Informationen</SectionHeading>
            <ul>
              {this.state.sites.items
                .filter(item => !item.fields.hidden)
                .map(item => (
                  <Item key={item.fields.slug}>
                    <Link to={`/${item.fields.slug}`}>{item.fields.title}</Link>
                  </Item>
                ))}
            </ul>
          </SidebarSection>
        </Fragment>
      ) : (
        <p>Es wird geladen...</p>
      )}
    </Nav>
  )
}

export default Sidebar
