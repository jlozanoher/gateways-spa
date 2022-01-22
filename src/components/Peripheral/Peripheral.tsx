import { DeleteOutlined } from "@ant-design/icons";
import { Button, Col, Row, Typography } from "antd";
import dayjs from "dayjs";
import React, { useContext } from "react";
import { useDrag } from "react-dnd";
import { PeripheralContext } from "../../App";
import { usePeripheralDelete } from "../../contollers/peripheral.controller";
import { dotsString } from "../../lib/utils";
import { ItemTypes } from "../../types/ItemsTypes";
import { PeripheralModel } from "../../types/peripheral.model";
import * as S from "./styles";

const { Text } = Typography;

interface Props {
  peripheral: PeripheralModel;
}

export const Peripheral = (props: Props) => {
  const { peripheral } = props;

  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: ItemTypes.PERIPHERAL,
      item: peripheral,
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    []
  );

  const { fetchPeripherals = () => {} } = useContext(PeripheralContext);

  const { handleDeletePeripheral } = usePeripheralDelete({
    onSuccess: () => {
      fetchPeripherals();
    },
  });

  const onDelete = () => {
    handleDeletePeripheral(peripheral._id);
  };

  return (
    <div ref={dragRef} style={{ opacity }}>
      <S.Card hoverable>
        <Row>
          <Col md={8}>
            <Button icon={<DeleteOutlined />} danger onClick={onDelete} />
          </Col>
          <Col>
            <S.Space direction="vertical">
              <Text>{peripheral.uid}</Text>
              <Text type="secondary">{dotsString(peripheral.gateway)}</Text>
              <Text>{peripheral.status}</Text>
              <Text>{peripheral.vendor}</Text>
              <Text>{dayjs(peripheral.createdAt).format("YY-MM-DD")}</Text>
            </S.Space>
          </Col>
        </Row>
      </S.Card>
    </div>
  );
};
