import { PlusOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import React, { useContext } from "react";
import { GatewayContext } from "./Gateways";
import * as S from "./styles";

const { Title } = Typography;

export const GatewayTopBar = () => {
  const { setShowModal = () => {} } = useContext(GatewayContext);

  const onClick = () => {
    setShowModal(true);
  };

  return (
    <S.Header>
      <Title level={3}>Gateways</Title>
      <S.Grow />
      <Button type="primary" icon={<PlusOutlined />} onClick={onClick}>
        Add Gateway
      </Button>
    </S.Header>
  );
};
