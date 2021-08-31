import { css } from 'linaria';

export const container = css`
  display: grid;
  grid-template-columns: repeat(9, minmax(100px, 0.3fr)) 3fr;
  align-items: center;
  grid-template-rows: repeat(9, minmax(100px, 1fr));
  & > div {
    place-self: center;
  }
`;



