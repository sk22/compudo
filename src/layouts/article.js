import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Base from './base'
import { Header, Title } from '../components/header'
import Logo from '../components/logo'
import Sidebar from '../components/sidebar'

const HeaderLogo = styled(Logo)`
  height: 10rem;
  margin-right: 3rem;

  @media screen and (max-width: 767px) {
    height: 5rem;
    margin-right: 1.5rem;
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
      border-bottom: .07rem solid #aaa;
      margin-bottom: 1rem;
      margin-left: 0;
    }
  }
`

const Main = styled.main`
  width: auto;
`

const Article = ({ children }) => (
  <Base>
    <Header>
      <HeaderLogo />
      <Title>compudo</Title>
    </Header>
    <Content>
      <Sidebar />
      <Main>{children}</Main>
    </Content>
  </Base>
)

Article.propTypes = {
  children: PropTypes.node.isRequired
}

export default Article
