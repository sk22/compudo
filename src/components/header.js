import styled from 'styled-components'

export const Header = styled.header`
  display: inline-flex;
  width: auto;
  padding: 2rem;
  align-items: center;

  @media screen and (max-width: 767px) {
    padding: 2rem 1rem;
  }
`

export const Title = styled.span`
  font-size: calc(10rem * 0.50748);
  font-weight: 300;

  @media screen and (max-width: 767px) {
    font-size: calc(5rem * 0.50748);
    font-weight: 400;
  }
`
