import { DeleteOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import React, { useContext } from "react";
import { useDrop } from "react-dnd";
import { PeripheralContext } from "../../App";
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

  const { fetchGateways = () => {} } = useContext(GatewayContext);
  const { peripherals, fetchPeripherals = () => {} } =
    useContext(PeripheralContext);

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

  const attachedPeripherals = peripherals?.filter(
    (p) => p.gateway === gateway._id
  );

  return (
    <div ref={drop}>
      <S.Card>
        <S.Box>
          <S.Box>
            <Button icon={<DeleteOutlined />} danger onClick={onDelete} />
          </S.Box>
          <S.Box style={{ flexDirection: "column" }}>
            <Title level={5}>{gateway.name}</Title>
            <Text type="secondary">{dotsString(gateway._id)}</Text>
            <div>{gateway.serialNumber}</div>
            <div>{gateway.ipv4Address}</div>
          </S.Box>
          <S.Box style={{ flexDirection: "column", flexGrow: 1 }}>
            <Title level={5}>{"Peripherals"}</Title>
            <PeripheralList peripherals={attachedPeripherals || []} />
          </S.Box>
        </S.Box>
      </S.Card>
    </div>
  );
};
