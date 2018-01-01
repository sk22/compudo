import styled from 'styled-components'

const Container = styled.div`
  background: white;
  width: 50rem;
  margin-left: 8rem;

  @media screen and (max-width: 1023px) {
    margin-left: 0;
    width: 100%;
  }
`

export default Container
