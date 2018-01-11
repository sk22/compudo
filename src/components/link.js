import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

export const linkCss = css`
  text-decoration: none;
  border-bottom: 0.1rem solid #87173d;
  transition: color 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
  transition: background-color 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);

  &,
  &:visited {
    color: #87173d;
  }

  &:hover,
  &:active {
    background: #87173d;
    color: white;
  }
`

const StyledLink = styled(Link)`
  ${linkCss};
`

export default StyledLink
