import { styled } from 'styled-components';

export const Inner = styled.div`
  max-width: ${(props) => props.theme.contentWidth};
  margin: 0 auto;
  padding: 0 40px;
`;
