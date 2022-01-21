import styled from "styled-components";
import * as Antd from "antd";

export const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;
`;

export const Grow = styled.div`
  flex-grow: 1;
`;

export const Modal = styled(Antd.Modal)`
  padding: 40px 24px;
`;
