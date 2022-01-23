import styled, { css } from "styled-components";
import * as Antd from "antd";

export const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  gap: 16px;
`;

export const Grow = styled.div`
  flex-grow: 1;
`;

export const Modal = styled(Antd.Modal)`
  padding: 40px 24px;
`;

const BoxCSS = css`
  display: flex;
  flex-wrap: wrap;
  gap: 4px 8px;
`;

export const Box = styled.div`
  ${BoxCSS}
`;

export const BoxC = styled.div`
  ${BoxCSS};
  flex-direction: column;
`;

export const Card = styled(Antd.Card)`
  background: #ffeeee;
  border-bottom: 1px solid #d7d0d0;

  &.connected {
    background: #deefce;
  }

  .ant-card-body {
    margin: 0px 8px;
    padding: 8px 4px;
  }
`;

export const DivH = styled.div`
  height: calc(100vh - 60px);
  overflow-y: scroll;
  overflow-x: hidden;
`;
