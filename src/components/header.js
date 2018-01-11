import styled from 'styled-components'
import Logo from '../components/logo'

export const Header = styled.header`
  display: inline-flex;
  width: auto;
  padding: 2rem;
  align-items: center;

  @media screen and (max-width: 767px), print {
    padding: 2rem 1rem;
  }
`

export const Title = styled.span`
  font-size: calc(10rem * 0.50748);
  font-weight: 300;

  @media screen and (max-width: 767px), print {
    font-size: calc(5rem * 0.50748);
    font-weight: 400;
  }
`

export const HeaderLogo = styled(Logo)`
  height: 10rem;
  margin-right: 2.5rem;

  @media screen and (max-width: 767px), print {
    height: 5rem;
    margin-right: 1.25rem;
  }
`
