import styled from 'styled-components'

export const Header = styled.header`
  display: flex;
  padding: 1rem;
  padding-top: 2rem;
  align-items: center;
`

export const Title = styled.span`
  font-size: calc(10rem * 0.50748);
  font-weight: 200;
  
  @media screen and (max-width: 767px) {
    font-size: calc(5rem * 0.50748);
    font-weight: 400;
  }
`
