import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import debounce from 'lodash.debounce'
import client from '../cms'
import Link from './link'
import { SectionHeading } from './heading'
import { SidebarSection } from './sidebar'
import { ListItem } from './list'

const StyledInput = styled.input`
  border: none;
  border-bottom: 0.1rem solid #777;
  font-size: 1.2rem;
  font-family: Ubuntu, sans-serif;
  padding: 0.4rem;

  @media screen and (max-width: 1023px) {
    width: 100%;
  }
`

class SearchBar extends Component {
  state = {
    text: '',
    results: null
  }

  handleChange = async e => {
    const text = e.target.value
    this.setState({ text })
    if (!text) {
      this.setState({ results: null })
    } else {
      this.conductFetch(text)
    }
  }

  conductFetch = debounce(async text => {
    const results = await this.fetchResults(text)
    if (this.state.text === text) this.setState({ results })
  }, 200)

  fetchResults = text =>
    client.getEntries({
      query: text,
      content_type: 'guide',
      limit: 10,
      select: 'fields.title,fields.slug'
    })

  render = () => (
    <Fragment>
      <StyledInput
        type="text"
        placeholder="Suche..."
        value={this.state.text}
        onChange={this.handleChange}
      />
      {this.state.results &&
        (this.state.results.items.length ? (
          <SidebarSection>
            <SectionHeading>Suchergebnisse</SectionHeading>
            <ul>
              {this.state.results.items.map(item => (
                <ListItem key={item.fields.slug}>
                  <Link to={`/${item.fields.slug}`}>{item.fields.title}</Link>
                </ListItem>
              ))}
            </ul>
          </SidebarSection>
        ) : (
          <p>
            Es wurden keine Erklärungen gefunden, die Ihren Suchkriterien
            entsprechen.
          </p>
        ))}
    </Fragment>
  )
}

export default SearchBar
