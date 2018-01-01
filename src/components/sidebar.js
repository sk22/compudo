import React, { Component } from 'react'
import styled from 'styled-components'
import SearchBar from './search-bar'
import { fetchGuides } from "../cms";

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  width: 18rem;

  @media screen and (max-width: 767px) {
    width: 100%;
  }
`

const List = styled.ul``

class Sidebar extends Component {
  state = {
    guides: null
  }

  async componentDidMount() {
    const guides = await fetchGuides()
    this.setState({ guides })
  }

  render = () =>
    this.state.guides ? (
      <Nav>
        <SearchBar guides={this.state.guides} />
        <h2>Erklärungen</h2>
        <List>
          <li>x</li>
        </List>
      </Nav>
    ) : (
      <p>Es wird geladen...</p>
    )
}

export default Sidebar
