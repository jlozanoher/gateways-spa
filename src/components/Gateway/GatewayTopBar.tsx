import { PlusOutlined, WarningOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import React, { useContext } from "react";
import { GatewayContext } from "./Gateways";
import * as S from "../styles";

const { Title, Text } = Typography;

export const GatewayTopBar = () => {
  const { setShowModal = () => {} } = useContext(GatewayContext);

  const onClick = () => {
    setShowModal(true);
  };

  return (
    <S.Header>
      <Title level={3}>Gateways</Title>
      <S.Grow>
        <Text type="warning">
          <WarningOutlined />
          Drag the peripherals into or out a Gateway
          <WarningOutlined />
        </Text>
      </S.Grow>
      <Button type="primary" icon={<PlusOutlined />} onClick={onClick}>
        Add Gateway
      </Button>
    </S.Header>
  );
};
