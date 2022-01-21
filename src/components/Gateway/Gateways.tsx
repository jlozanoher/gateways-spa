import { Button } from "antd";
import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ROUTES } from "../../lib/routes";
import { GatewayModel } from "../../types/gateway.model";
import { GatewayCreate } from "./GatewayCreate";
import { GatewaysList } from "./GatewaysList";
import { GatewayTopBar } from "./GatewayTopBar";
import * as S from "../styles";

export interface IGatewayContext {
  fetchGateways?: () => void;
  setShowModal?: Dispatch<SetStateAction<boolean>>;
  showModal?: boolean;
}

export const GatewayContext = React.createContext<IGatewayContext>({});

export const Gateways = () => {
  const [gateways, setGateways] = useState<GatewayModel[]>([]);
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

  return (
    <GatewayContext.Provider value={{ fetchGateways, setShowModal, showModal }}>
      <GatewayTopBar />
      <GatewaysList gateways={gateways} />
      <S.Modal
        title={"Add Gateway"}
        maskClosable
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={[
          <Button type="primary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>,
        ]}
      >
        <GatewayCreate />
      </S.Modal>
    </GatewayContext.Provider>
  );
};
