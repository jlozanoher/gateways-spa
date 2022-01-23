import * as Antd from "antd";
import styled from "styled-components";

export const Space = styled(Antd.Space)`
  gap: 2px !important;

  &.small {
    width: 114px;
  }
`;

export const Card = styled(Antd.Card)`
  background: #ffeeee;
  &.connected {
    background: #c5e5a7;
  }
  .ant-card-body {
    padding: 8px 4px;
  }
  width: 180px;
`;
