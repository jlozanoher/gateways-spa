import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import cs from "classnames";
import React, { useContext } from "react";
import { useDrop } from "react-dnd";
import { AppContext } from "../../App";
import { useGatewayDelete } from "../../contollers/gateway.controller";
import { usePeripheralUpdate } from "../../contollers/peripheral.controller";
import { dotsString } from "../../lib/utils";
import { GatewayModel } from "../../types/gateway.model";
import { ItemTypes } from "../../types/ItemsTypes";
import { PeripheralList } from "../Peripheral/PeripheralList";
import * as S from "../styles";
import { GatewayContext } from "./Gateways";

const { Title, Text } = Typography;

interface Props {
  gateway: GatewayModel;
}

export const Gateway = (props: Props) => {
  const { gateway } = props;

  const { setGatewayForEdition = () => {}, setShowModal = () => {} } =
    useContext(GatewayContext);

  const { fetchGateways = () => {} } = useContext(AppContext);

  const { peripherals, fetchPeripherals = () => {} } = useContext(AppContext);

  const { handleUpdatePeripheral } = usePeripheralUpdate({
    onSuccess: () => {
      fetchPeripherals();
    },
  });

  const [collected, drop] = useDrop(
    () => ({
      accept: ItemTypes.PERIPHERAL,
      drop: (item: any, monitor: any) => {
        handleUpdatePeripheral({ ...item, gateway: gateway._id });
      },
      collect: (monitor) => {
        return monitor.getItem();
      },
    }),
    []
  );

  const { handleDeleteGateway } = useGatewayDelete({
    onSuccess: () => {
      fetchGateways();
      fetchPeripherals();
    },
  });

  const onDelete = () => {
    handleDeleteGateway(gateway._id);
  };

  const onEdit = () => {
    setGatewayForEdition(gateway);
    setShowModal(true);
  };

  const attachedPeripherals =
    peripherals?.filter((p) => p.gateway === gateway._id) || [];

  const connected = attachedPeripherals.length;

  return (
    <div ref={drop}>
      <S.Card className={cs({ connected: connected })}>
        <S.Box>
          <S.BoxC>
            <Button icon={<DeleteOutlined />} danger onClick={onDelete} />
            <Button icon={<EditOutlined />} onClick={onEdit} />
          </S.BoxC>
          <S.BoxC>
            <Title level={5}>{gateway.name}</Title>
            <Text type="secondary">{dotsString(gateway._id)}</Text>
            <div>{gateway.serialNumber}</div>
            <div>{gateway.ipv4Address}</div>
          </S.BoxC>
          <S.Box style={{ flexDirection: "column", flexGrow: 1 }}>
            <Title level={5}>{"Peripherals"}</Title>
            <PeripheralList peripherals={attachedPeripherals || []} />
          </S.Box>
        </S.Box>
      </S.Card>
    </div>
  );
};
