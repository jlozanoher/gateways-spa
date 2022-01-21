import { Card, Typography } from "antd";
import React from "react";
import { PeripheralModel } from "../../types/peripheral.model";
import * as S from "./styles";

const { Text } = Typography;

interface Props {
  peripheral: PeripheralModel;
}

export const Peripheral = (props: Props) => {
  const { peripheral } = props;

  return (
    <S.Card hoverable>
      <S.Space direction="vertical">
        <Text>{peripheral.uid}</Text>
        <Text type="secondary">{peripheral.gateway}</Text>
        <Text>{peripheral.status}</Text>
        <Text>{peripheral.vendor}</Text>
      </S.Space>
    </S.Card>
  );
};
