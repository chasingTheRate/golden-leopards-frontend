

import Link from 'next/link';
import styled from 'styled-components';

const StyledLink = styled.a`
  color: #15469d;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9em;
  line-height: 1.1em;
`

export default ({ href, name }) => (
  <Link prefetch href={href} passHref>
    <StyledLink>{name}</StyledLink>
  </Link>
)
