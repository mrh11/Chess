import { css } from 'linaria';

export const squareStyle = css`
  width: 100%;
  height: 100%;
  background-color: NavajoWhite;
  &.colored {
    background-color: Sienna;
  }
  text-align:center;
`;

export const dot = css`
  height: 25px;
  width: 25px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
`;
