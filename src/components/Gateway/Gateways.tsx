import { Button } from "antd";
import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { AppContext } from "../../App";
import { GatewayModel } from "../../types/gateway.model";
import * as S from "../styles";
import { GatewayCreate } from "./GatewayCreate";
import { GatewaysList } from "./GatewaysList";
import { GatewayTopBar } from "./GatewayTopBar";

export interface IGatewayContext {
  setShowModal?: Dispatch<SetStateAction<boolean>>;
  showModal?: boolean;
  gatewayForEditon?: GatewayModel;
  setGatewayForEdition?: Dispatch<SetStateAction<GatewayModel | undefined>>;
}

export const GatewayContext = React.createContext<IGatewayContext>({});

export const Gateways = () => {
  const [gatewayForEditon, setGatewayForEdition] = useState<
    GatewayModel | undefined
  >(undefined);
  const [showModal, setShowModal] = useState(false);

  const { gateways = [] } = useContext(AppContext);

  const handleModalClose = () => {
    setShowModal(false);
    setGatewayForEdition(undefined);
  };

  return (
    <GatewayContext.Provider
      value={{
        setShowModal,
        showModal,
        gatewayForEditon,
        setGatewayForEdition,
      }}
    >
      <GatewayTopBar />
      <GatewaysList gateways={gateways} />
      <S.Modal
        title={gatewayForEditon ? "Update Gateway" : "Create Gateway"}
        maskClosable
        visible={showModal}
        onCancel={handleModalClose}
        footer={[
          <Button type="primary" onClick={handleModalClose}>
            Cancel
          </Button>,
        ]}
      >
        <GatewayCreate gateway={gatewayForEditon} onSave={handleModalClose} />
      </S.Modal>
    </GatewayContext.Provider>
  );
};
