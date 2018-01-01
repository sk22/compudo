import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import debounce from 'lodash.debounce'
import PropTypes from 'prop-types'
import client from '../cms'

const StyledInput = styled.input`
  background: #eee;
  border: none;
  font-size: 1.2rem;
  font-family: Ubuntu, sans-serif;
  padding: 0.4rem;
  width: 20rem;

  @media screen and (max-width: 1023px) {
    width: 100%;
  }
`

const Results = styled.ul``

const Result = ({ entry }) => (
  <li>
    <a href={`/${entry.fields.slug}`}>{entry.fields.title}</a>
  </li>
)

Result.propTypes = {
  entry: PropTypes.shape({
    fields: PropTypes.shape({ slug: PropTypes.string, title: PropTypes.string })
  })
}

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
      content_type: 'guide'
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
          <Results>
            {this.state.results.items.map(item => (
              <Result key={item.fields.slug} entry={item} />
            ))}
          </Results>
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
