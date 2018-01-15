import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { DecorationlessLink } from '../components/link'
import { Header, Title, HeaderLogo } from '../components/header'
import Sidebar from '../components/sidebar'

const Container = styled.div`
  width: 60rem;
  margin-left: 4rem;

  @media screen and (max-width: 1023px), print {
    margin-left: 0;
    width: 100%;
  }
`

const Content = styled.div`
  display: flex;
  padding: 1rem;

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
