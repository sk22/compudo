import styled from 'styled-components'

export const PrintOnly = styled.div`
  display: none;

  @media print {
    display: initial;
  }
`

export const NoPrint = styled.div`
  display: initial;

  @media print {
    display: none;
  }
`

