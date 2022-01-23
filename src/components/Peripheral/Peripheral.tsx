import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import cs from "classnames";
import dayjs from "dayjs";
import React, { useContext } from "react";
import { useDrag } from "react-dnd";
import { PeripheralContext } from "../../App";
import { usePeripheralDelete } from "../../contollers/peripheral.controller";
import { dotsString } from "../../lib/utils";
import { ItemTypes } from "../../types/ItemsTypes";
import { PeripheralModel } from "../../types/peripheral.model";
import * as S2 from "../styles";
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

  const {
    fetchPeripherals = () => {},
    setPeripheralForEdition = () => {},
    setShowModal = () => {},
  } = useContext(PeripheralContext);

  const { handleDeletePeripheral } = usePeripheralDelete({
    onSuccess: () => {
      fetchPeripherals();
    },
  });

  const onDelete = () => {
    handleDeletePeripheral(peripheral._id);
  };

  const onEdit = () => {
    setPeripheralForEdition(peripheral);
    setShowModal(true);
  };

  return (
    <div ref={dragRef} style={{ opacity, width: "180px" }}>
      <S.Card hoverable className={cs({ connected: peripheral.gateway })}>
        <S2.Box>
          <S2.BoxC>
            <Button icon={<DeleteOutlined />} danger onClick={onDelete} />
            <Button icon={<EditOutlined />} onClick={onEdit} />
          </S2.BoxC>

          <S.Space direction="vertical" className={cs("small")}>
            <Text>{peripheral.uid}</Text>
            <Text type="secondary">{dotsString(peripheral.gateway)}</Text>
            <Text>{peripheral.status}</Text>
            <Text>{peripheral.vendor}</Text>
            <Text>{dayjs(peripheral.createdAt).format("YY-MM-DD")}</Text>
          </S.Space>
        </S2.Box>
      </S.Card>
    </div>
  );
};
