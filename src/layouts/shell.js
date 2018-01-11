import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import Container from '../components/container'
import { Header, Title } from '../components/header'
import Logo from '../components/logo'
import Sidebar from '../components/sidebar'

const HeaderLogo = styled(Logo)`
  height: 10rem;
  margin-right: 2.5rem;

  @media screen and (max-width: 767px) {
    height: 5rem;
    margin-right: 1.25rem;
  }
`

const Content = styled.div`
  display: flex;
  padding: 1rem;

  & > * + * {
    margin-left: 2rem;
  }

  @media screen and (max-width: 767px) {
    flex-direction: column-reverse;

    & > * + * {
      padding-bottom: 1rem;
      border-bottom: 0.07rem solid #aaa;
      margin-bottom: 1rem;
      margin-left: 0;
    }
  }
`

const Main = styled.main`
  flex-grow: 1;
`

const DecorationlessLink = styled(Link)`
  text-decoration: none;
  color: initial;
`

const Shell = ({ title = 'compudo', children }) => {
  document.title = title
  return (
    <Container>
      <DecorationlessLink to="/">
        <Header>
          <HeaderLogo />
          <Title>compudo</Title>
        </Header>
      </DecorationlessLink>
      <Content>
        <Sidebar />
        <Main>{children}</Main>
      </Content>
    </Container>
  )
}

Shell.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default Shell
