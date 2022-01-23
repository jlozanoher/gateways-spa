import { Button } from "antd";
import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ROUTES } from "../../lib/routes";
import { GatewayModel } from "../../types/gateway.model";
import * as S from "../styles";
import { GatewayCreate } from "./GatewayCreate";
import { GatewaysList } from "./GatewaysList";
import { GatewayTopBar } from "./GatewayTopBar";

export interface IGatewayContext {
  fetchGateways?: () => void;
  setShowModal?: Dispatch<SetStateAction<boolean>>;
  showModal?: boolean;
  gatewayForEditon?: GatewayModel;
  setGatewayForEdition?: Dispatch<SetStateAction<GatewayModel | undefined>>;
}

export const GatewayContext = React.createContext<IGatewayContext>({});

export const Gateways = () => {
  const [gateways, setGateways] = useState<GatewayModel[]>([]);
  const [gatewayForEditon, setGatewayForEdition] = useState<
    GatewayModel | undefined
  >(undefined);
  const [showModal, setShowModal] = useState(false);

  const fetchGateways = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}${ROUTES.gateways}`)
      .then((res) => {
        setGateways(res.data);
      });
  };

  useEffect(() => {
    fetchGateways();
  }, []);

  const handleModalClose = () => {
    setShowModal(false);
    setGatewayForEdition(undefined);
  };

  return (
    <GatewayContext.Provider
      value={{
        fetchGateways,
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
        <GatewayCreate gateway={gatewayForEditon} />
      </S.Modal>
    </GatewayContext.Provider>
  );
};
