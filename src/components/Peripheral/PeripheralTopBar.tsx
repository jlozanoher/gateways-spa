import { PlusOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import React, { useContext } from "react";
import { PeripheralContext } from "../../App";
import * as S from "../styles";

const { Title } = Typography;

export const PeripheralTopBar = () => {
  const { setShowModal = () => {} } = useContext(PeripheralContext);

  const onClick = () => {
    setShowModal(true);
  };

  return (
    <S.Header>
      <Title level={3}>Peripherals</Title>
      <S.Grow />
      <Button type="primary" icon={<PlusOutlined />} onClick={onClick}>
        Add Peripheral
      </Button>
    </S.Header>
  );
};
