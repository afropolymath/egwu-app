import { IconBase } from "react-icons/lib";
import styled, { css, keyframes } from "styled-components";

const DEFAULT_ICON_COLOR = "purple";
const DISABLED_ICON_COLOR = "#333";

const continuousBlink = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 100;
  }
`;

const blinkingAnimation = css`
  animation: ${continuousBlink} linear 2s infinite alternate;
`;

export const ToolbarButton = styled.a<{ blinking?: boolean }>`
  padding: 0.4em 0.6em;
  display: inline-block;
  cursor: pointer;
  ${(props) => props.blinking && blinkingAnimation}
`;

export const ToolbarLayout = styled.div`
  border-bottom: solid 1px gray;
`;

export const ToolbarIcon = styled(IconBase)<{ disabled?: boolean }>`
  color: ${(props) =>
    props.disabled ? DISABLED_ICON_COLOR : DEFAULT_ICON_COLOR};
`;
