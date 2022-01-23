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
    setPeripheralForEdition = () => {},
    peripheralForEdition,
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

  const handleCancel = () => {
    setShowModal(false);
    setPeripheralForEdition(undefined);
  };

  const unatachedPeripherals = peripherals.filter((p) => !p.gateway);

  return (
    <div ref={drop} style={{ height: "100%" }}>
      <PeripheralTopBar />
      <S.DivH>
        <PeripheralList peripherals={unatachedPeripherals} />
      </S.DivH>

      <S.Modal
        title={peripheralForEdition ? "Update Peripheral" : "Create Peripheral"}
        maskClosable
        visible={showModal}
        onCancel={handleCancel}
        footer={[
          <Button type="primary" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
      >
        <PeripheralCreate
          peripheral={peripheralForEdition}
          onSave={handleCancel}
        />
      </S.Modal>
    </div>
  );
};
