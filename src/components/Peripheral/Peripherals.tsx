import { Button } from "antd";
import React, { useContext } from "react";
import { useDrop } from "react-dnd";
import { PeripheralContext } from "../../App";
import { usePeripheralUpdate } from "../../contollers/peripheral.controller";
import { ItemTypes } from "../../types/ItemsTypes";
import * as S from "../styles";
import { PeripheralCreate } from "./PeripheralCreate";
import { PeripheralList } from "./PeripheralList";
import { PeripheralTopBar } from "./PeripheralTopBar";

export const Peripherals = () => {
  const {
    peripherals = [],
    showModal,
    setShowModal = () => {},
    fetchPeripherals = () => {},
  } = useContext(PeripheralContext);

  const { handleUpdatePeripheral } = usePeripheralUpdate({
    onSuccess: () => {
      fetchPeripherals();
    },
  });

  const [collected, drop] = useDrop(
    () => ({
      accept: ItemTypes.PERIPHERAL,
      drop: (item: any, monitor: any) => {
        handleUpdatePeripheral({ ...item, gateway: "detach" });
      },
      collect: (monitor) => {
        return monitor.getItem();
      },
    }),
    []
  );

  const unatachedPeripherals = peripherals.filter((p) => !p.gateway);

  return (
    <div ref={drop} style={{ height: "100%" }}>
      <PeripheralTopBar />
      <S.DivH>
        <PeripheralList peripherals={unatachedPeripherals} />
      </S.DivH>

      <S.Modal
        title={"Add Peripheral"}
        maskClosable
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={[
          <Button type="primary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>,
        ]}
      >
        <PeripheralCreate />
      </S.Modal>
    </div>
  );
};
