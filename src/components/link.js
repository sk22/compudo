import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledLink = styled(Link)`
  &, &:visited {
    color: mediumblue;
  }

  &:active {
    color: darkblue;
  }
`

export default StyledLink
