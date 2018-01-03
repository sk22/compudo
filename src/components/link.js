import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

export const linkCSS = css`
  text-decoration: none;
  border-bottom: .1rem solid black;
  transition: color 0.2s cubic-bezier(.25,.8,.25,1);
  transition: background-color 0.2s cubic-bezier(.25,.8,.25,1);

  &, &:visited {
    color: darkblue;
  }

  &:hover, &:active {
    background: darkblue;
    color: white;
  }
`

const StyledLink = styled(Link)`${linkCSS}`

export default StyledLink
