import styled, { css } from 'styled-components'

export const headingCss = css`
  font-size: 2.3rem;
  font-weight: 400;
`

export const Heading = styled.h1`
  ${headingCss};
`

export const subheadingCss = css`
  font-size: 1.7rem;
  font-weight: normal;
`

export const Subheading = styled.h2`
  ${subheadingCss};
`

export const SectionHeading = styled.h2`
  margin-top: 0;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  font-size: 1.2rem;
  font-weight: bold;
`

export const TitleHeading = styled(Heading)`
  margin-top: 0;
`
