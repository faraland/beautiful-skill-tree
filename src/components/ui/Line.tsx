import React from 'react';
import styled, { BaseThemedCssFunction } from 'styled-components';
import { NodeState } from '../../models';
import { SELECTED_STATE, LOCKED_STATE } from '../../components/constants';
import { SkillTheme } from '../../theme';

const keyframes = require('styled-components').keyframes;
const css: BaseThemedCssFunction<SkillTheme> = require('styled-components').css;

interface LineProps {
  state: NodeState;
}

interface StyledLineProps {
  selected: boolean;
  unlocked: boolean;
}

function Line({ state }: LineProps) {
  return (
    <LineContainer>
      <StyledLine
        data-testid="straight-line"
        selected={state === SELECTED_STATE}
        unlocked={state !== LOCKED_STATE}
      />
    </LineContainer>
  );
}

export default Line;

const LineContainer = styled.div`
  height: 56px;
  left: 4px;
  margin: 0 auto;
  position: relative;
  width: 4px;
`;

const slidedown = keyframes`
  from,
  50% {
    background-position: right top;
  }

  to {
    background-position: left bottom;
  }
`;

const StyledLine = styled.div<StyledLineProps>`
  background: linear-gradient(
    to right,
    rgba(49, 208, 170, 1) 0%,
    rgba(49, 208, 170, 1) 50%,
    rgba(49, 208, 170, 0) 51%,
    rgba(49, 208, 170, 0) 100%
  );
  background-size: 210% 100%;
  background-position: right top;
  border: ${({ theme }) => theme.edgeBorder};
  height: 4px;
  opacity: 1;
  transform: rotate(90deg);
  transform-origin: 0 0;
  width: 56px;

  ${props =>
    !props.selected &&
    `
    background: #444165;
    `}
  ${props =>
    props.selected &&
    css`
      border: 1px solid #31d0aa;
      animation: ${slidedown} 1.2s 1 ease-out;
      background-position: left bottom;
    `}
`;
